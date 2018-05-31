import base64
import json, os

import pyexcel as pexcel
import cognitive_face as face_api
import requests as requests
from PIL import Image

from flask import Flask, request, session, redirect, url_for, render_template, flash, jsonify, send_from_directory
from models import db, User, Emotion, Question, UserQuestion
from form import LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm
from sqlalchemy.exc import IntegrityError, DataError
from datetime import datetime
import bcrypt

app = Flask(__name__)
db.init_app(app)
app.secret_key = 'Secret'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MS_BASE_URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'
MS_KEY = os.environ['MS_KEY']
MS_KEY = '33c24d8bf94f4daa9fad6b0cfc69e9bd'     # 테스트용 KEY

face_api.Key.set(MS_KEY)
face_api.BaseUrl.set(MS_BASE_URL)
img_url = 'https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/detection1.jpg'


# Index Page

@app.route("/")
def main():
    return send_from_directory('./mobile/platforms/browser/www', 'index.html')


@app.route("/<path:path>")
def send_js(path):
    return send_from_directory('./mobile/platforms/browser/www', path)


@app.route('/index')
def index():
    # If User is authenticated
    if 'current_user' in session:
        current_user = session['current_user']
        end_date = datetime.now().strftime("%Y-%m-31")

        user = User.query.filter_by(username=current_user).first()
        emotions = Emotion.query.filter_by(user_id=user.id).all()
        emotions_month = Emotion.query.filter_by(user_id=user.id).filter(Emotion.date >= '2018-05-01', Emotion.date <= end_date).all()
        user_questions = UserQuestion.query.filter_by(user_id=user.id).all()
        user_questions_month = UserQuestion.query.filter_by(user_id=user.id).filter(Emotion.date >= '2018-05-01', Emotion.date <= end_date).all()

        data = dict()
        data['emotions'] = len(emotions)
        data['emotions_month'] = len(emotions_month)
        data['userQuestions'] = len(user_questions)
        data['userQuestions_month'] = len(user_questions_month)

        return render_template('index.html', current_user=user, data=data)
    else:
        return redirect(url_for('login'))


# 로그인
@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()

    # If request = POST
    if form.validate_on_submit() or request.method == 'POST':

        user = User.query.filter_by(username=form.username.data).first()

        rtype = 'html'
        # if hasattr(form, 'rtype'):
        #     rtype = form.rtype.data
        api_data = request.form['rtype']
        if api_data == 'json':
            rtype = api_data

        # ID가 있을 시
        if user is not None:

            # Check Password
            if bcrypt.checkpw(form.password.data.encode('utf-8'), user.password.encode('utf-8')):
            # if user.password == form.password.data:
                json_result = {'status_code': 200, 'msg': 'success login', 'user': '<%s>' % user.username}

                if rtype == 'html':
                    session['current_user'] = form.username.data
                    return redirect(url_for('index'))
                else:
                    return jsonify(json_result)

            else:
                json_result = {'status_code': '222', 'error': 'Invalid username or password'}
                if rtype == 'html':
                    flash('Invalid username or password')
                    return redirect(url_for('login'))
                else:
                    return jsonify(json_result)

        # ID가 없을 시
        else:
            json_result = {'status_code': '224', 'error': 'Not exist username'}
            if rtype == 'html':
                flash('Not exist username')
                return redirect(url_for('login'))
            else:
                return jsonify(json_result)
    return render_template('login.html', form=form)


# 회원가입
@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    if form.validate_on_submit():
        rtype = 'html'
        if hasattr(form, 'rtype'):
            rtype = form.rtype.data

        u = User(username=form.username.data, email=form.email.data, password_text=form.password.data)
        # u = User(username="taewoo", password="201221002")
        db.session.add(u)
        try:
            json_result = {'status code': '200', 'msg': 'Success Register', 'username:':
                           '<%s>' % u.username}

            if rtype == 'html':
                db.session.commit()
                flash('Success Register')
                return redirect(url_for('login'))
            else:
                return jsonify(json_result)

        # Error : 223 (Already exist username)
        except IntegrityError:
            json_result = {'status code': '223', 'error': 'Already exist username.'}

            if rtype == 'html':
                flash('Already exist username.')
            else:
                return jsonify(json_result)
    return render_template('register.html', form=form)


# 로그아웃
@app.route("/logout")
def logout():
    del session['current_user']
    return redirect(url_for('login'))


# Forgot Password
@app.route("/forgot", methods=['GET', 'POST'])
def forgot_password():
    form = ForgotPasswordForm()
    if form.validate_on_submit():
        check_result = check_email_username(form.email.data, form.username.data)

        if check_result is not None:
            session['forgot_user'] = check_result
            return redirect(url_for('reset_password'))
        else:
            flash('Invalid email or username')
            return redirect(url_for('forgot_password'))
    return render_template('forgot.html', form=form)


# Check Email and Username
def check_email_username(email, username):
    user_email = User.query.filter_by(email=email).first()
    user_name = User.query.filter_by(username=username).first()
    if user_email is not None:
        if user_email.username == username:
            return user_email.email
        else:
            return False
    elif user_name is not None:
        if user_name.email == email:
            return user_name.email
        else:
            return False
    else:
        return False


# Reset Password
@app.route("/reset", methods=['GET', 'POST'])
def reset_password():
    form = ResetPasswordForm()
    if form.validate_on_submit():
        email = session['forgot_user']
        user = User.query.filter_by(email=email).first()
        password = user.reset_password(password_text=form.password1.data)
        user.password = password
        db.session.commit()
        del session['forgot_user']
        return redirect(url_for('login'))
    return render_template('reset.html', form=form)


# 감정 조회
@app.route("/api/getEmotion/<user_id>/<device_id>", methods=['GET', 'POST'])
def get_face_api(user_id, device_id):

    if request.method == 'POST':
        headers, params = make_params()
        received_bytes = base64.decodebytes(request.form['image'].split(',')[1].encode('ascii'))
        api_result = faceapi_request_process(None, transpose_image(received_bytes), headers, params)

    else:
        api_result = face_api.face.detect(img_url, True, False, 'emotion,age,gender')

    user = User.query.filter_by(username=user_id).first()
    return_data = make_return_data(api_result, user)

    return jsonify(return_data)


def make_params():
    # Face detection parameters
    params = {'returnFaceAttributes': 'emotion,age,gender',
              'returnFaceLandmarks': 'true'}
    headers = dict()
    headers['Ocp-Apim-Subscription-Key'] = MS_KEY
    headers['Content-Type'] = 'application/octet-stream'
    return headers, params


def make_return_data(api_result, user):
    return_data = dict()
    if len(api_result) > 0:
        user_emotion = str(json.dumps(api_result[0]["faceAttributes"]["emotion"]))
        represent_emotion = analysis_emotion_process(api_result[0]["faceAttributes"])

        e = Emotion(user=user, emotion_json=user_emotion, res=represent_emotion)
        db.session.add(e)
        db.session.commit()

        return_data["code"] = 200
        return_data = json.loads(user_emotion)
        return_data["represent_emotion"] = represent_emotion
        return_data["represent_age"] = api_result[0]["faceAttributes"]["age"]
        return_data["represent_gender"] = api_result[0]["faceAttributes"]["gender"]

    elif len(api_result) == 0:
        return_data["code"] = 203
        return_data["msg"] = "No Match Face"

    else:
        return_data["code"] = 404
        return_data["msg"] = "Other Error!"
    return return_data


# 질문 입력
@app.route("/api/setQuestion/<q_name>")
def set_question_api(q_name):

    # records = pexcel.iget_records(file_name="questions.xls")
    records = pexcel.iget_records(file_name="./tests/"+q_name + ".xls")

    for record in records:
        question = dict()
        question['q_content'] = record['질문']
        question['q_emotion'] = record['감정분류']
        question['q_tag1'] = record['태그1']
        question['q_tag2'] = record['태그2']
        q = Question(question=json.dumps(question))
        db.session.add(q)
        db.session.commit()

    qs = Question.query().all()
    return "Questions Count: {c}".format(c=len(qs))


# 질문 조회
@app.route("/api/getQuestion/<user_id>/<device_id>", methods=['GET', 'POST'])
def get_question_api(user_id, device_id):
    return_data = dict()
    today = datetime.now().strftime("%m/%d")

    user = User.query.filter_by(username=user_id).first()

    if user is None:
        return_data["code"] = 203
        return_data["msg"] = "No Match User"

    else:
        today_emotion = Emotion.query.filter_by(user_id=user.id).first()

        selected_question = select_question_process(today, today_emotion.result)

        return_data["code"] = 200
        return_data["data"] = {'q_id': selected_question.id, 'q_text': str.encode(selected_question.content)}

    return jsonify(return_data)


# faceapi 전송 함수
# octet-stream API REQ Func
def faceapi_request_process(json, data, headers, params):
    result = None

    while True:

        response = requests.request('post', MS_BASE_URL + "/detect", json=json, data=data, headers=headers, params=params)

        if response.status_code == 429:

            print("Message: %s" % (response.json()['error']['message']))

        elif response.status_code == 200 or response.status_code == 201:

            if 'content-length' in response.headers and int(response.headers['content-length']) == 0:
                result = None
            elif 'content-type' in response.headers and isinstance(response.headers['content-type'], str):
                if 'application/json' in response.headers['content-type'].lower():
                    result = response.json() if response.content else None
                elif 'image' in response.headers['content-type'].lower():
                    result = response.content
        else:
            print("Error code: %d" % (response.status_code))
            print("Message: %s" % (response.json()['error']['message']))

        break

    return result


def transpose_image(bytes):
    img = Image.open(os.io.BytesIO(bytes))
    return img.transpose(Image.ROTATE_90).tobytes()


# 감정정보 분석 함수
def analysis_emotion_process(emotion_data):
    user_emotion = None

    # lists
    temp = emotion_data['emotion'].items()
    emotion_list = list(temp)
    emotion_list.sort(key=lambda x: x[1])

    #Emotion 분석 시작
    if emotion_list[emotion_list.__len__() - 1][0] in 'neutral':
        user_emotion = emotion_list[emotion_list.__len__() - 2][0]
    else:
        user_emotion = emotion_list[emotion_list.__len__() - 1][0]

    return user_emotion


# 질문 선택 함수
def select_question_process(today, today_emotion):

    selected_question = Question.query.filter_by(tag1=today).first()

    if selected_question is None:
        if today_emotion is not None:
            selected_question = Question.query.filter_by(emotion=today_emotion).first()
        else:
            selected_question = Question.order_by()

    return selected_question


def init_database():
    with app.app_context():
        db.create_all()


if __name__ == '__main__':
    init_database()
    app.run(port=5000, debug=True)


def transpose_image(name):
    img = Image.open(name)
    transposed = img.transpose(Image.ROTATE_90)
    return transposed


def transpose_image_bytes(name):

    return None