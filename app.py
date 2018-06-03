import base64
import io
import json, os
import re
import random
import boto3 as boto3
import pyexcel as pexcel
import cognitive_face as face_api
import requests as requests
from PIL import Image

from flask import Flask, request, session, redirect, url_for, render_template, flash, jsonify, send_from_directory
from models import db, User, Emotion, Question, UserQuestion, ReplyMent
from form import LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm
from sqlalchemy.exc import IntegrityError
from datetime import datetime
import bcrypt


app = Flask(__name__)
db.init_app(app)
app.secret_key = 'Secret'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MS_BASE_URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'
MS_KEY = os.environ['MS_KEY']

img_url = 'https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/detection1.jpg'
s3_client = boto3.client("s3", aws_access_key_id=os.environ['AWS_ACCESS'], aws_secret_access_key=os.environ['AWS_SECRET'])

face_api.Key.set(MS_KEY)
face_api.BaseUrl.set(MS_BASE_URL)


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
        end_date = datetime.now().strftime("%Y-%m-30")

        user = User.query.filter_by(username=current_user).first()
        emotions = Emotion.query.filter_by(user_id=user.id).order_by(Emotion.date.desc()).all()
        emotions_month = Emotion.query.filter_by(user_id=user.id).filter(Emotion.date >= '2018-05-01', Emotion.date <= end_date).all()
        user_questions = UserQuestion.query.filter_by(user_id=user.id).all()
        user_questions_month = UserQuestion.query.filter_by(user_id=user.id).filter(Emotion.date >= '2018-05-01', Emotion.date <= end_date).all()

        data = dict()
        data['emotions'] = len(emotions)
        data['emotions_month'] = len(emotions_month)
        data['userQuestions'] = len(user_questions)
        data['userQuestions_month'] = len(user_questions_month)

        return render_template('index.html', current_user=current_user, data=data, user=user, emotions=emotions)
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
        if 'rtype' in request.form:
            rtype = request.form['rtype']

        # ID가 있을 시
        if user is not None:

            # Check Password
            if bcrypt.checkpw(form.password.data.encode('utf-8'), user.password.encode('utf-8')):
                json_result = {'status_code': '200', 'msg': 'success login', 'user': '%s' % user.username}

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

        u = User(username=form.username.data, email=form.email.data, password_text=form.password.data)
        # u = User(username="taewoo", password="201221002")
        db.session.add(u)
        try:
            db.session.commit()
            flash('Success Register')
            return redirect(url_for('login'))

        # Error : 223 (Already exist username)
        except IntegrityError:
            flash('Already exist username.')
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


# 누적 감정 기록 View Page
@app.route("/emotion")
def emotion():
    current_user = session['current_user']
    user = User.query.filter_by(username=current_user).first()
    data = Emotion.query.filter_by(user_id=user.id).first()
    return render_template('emotion.html', current_user=current_user, data=data)


# 다이어리 저장
@app.route("/api/record", methods=['POST'])
def set_record():
    record_url = get_record_file(request.form['data'])
    user = User.query.filter_by(username=request.form['username']).first()
    question = Question.query.filter_by(id=request.form['q_id']).first()

    uq = UserQuestion(user=user, question=question, reply=record_url)
    db.session.add(uq)
    db.session.commit()

    return jsonify({'result': True, 'save_id': uq.id})


def get_record_file(record_data):
    key_name = str(datetime.now().timestamp()) + '.mp3'
    s3_client.put_object(ACL='public-read', Body=base64.b64decode(record_data.split(',')[1]), Key=key_name,
                         Metadata={'Content-Type': 'audio/mpeg'}, Bucket='ryun.capstone')

    return 'https://s3.ap-northeast-2.amazonaws.com/ryun.capstone/' + key_name


# 감정 조회
@app.route("/api/getEmotion/<user_id>/<device_id>", methods=['GET', 'POST'])
def get_face_api(user_id, device_id):

    if request.method == 'POST':
        headers, params = make_params()
        img_str = prepare_img(Image.ROTATE_270)
        api_result = faceapi_request_process(None, base64.decodebytes(img_str), headers, params)

    else:
        api_result = face_api.face.detect(img_url, True, False, 'emotion,age,gender')

    user = User.query.filter_by(username=user_id).first()
    return_data = make_return_data(api_result, user)

    return jsonify(return_data)


def prepare_img(rotate=None):
    image_data = re.sub('^data:image/.+;base64,', '', request.form['image'])
    im = Image.open(io.BytesIO(base64.b64decode(image_data)))
    buffered = io.BytesIO()
    if rotate:
        im = im.transpose(rotate)
    im.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue())
    return img_str


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

        ment = ReplyMent.query.filter_by(emotion=represent_emotion).first()
        e = Emotion(user=user, emotion_json=user_emotion, res=represent_emotion)
        db.session.add(e)
        db.session.commit()

        return_data["code"] = 200
        return_data = json.loads(user_emotion)
        return_data["represent_emotion"] = represent_emotion
        return_data["represent_age"] = api_result[0]["faceAttributes"]["age"]
        return_data["represent_gender"] = api_result[0]["faceAttributes"]["gender"]
        return_data["ment"] = ment.reply_ment
        return_data["tts"] = ment.tts

    elif len(api_result) == 0:
        return_data["code"] = 203
        return_data["msg"] = "No Match Face"

    else:
        return_data["code"] = 404
        return_data["msg"] = "Other Error!"
    return return_data


# 감정 수동입력
@app.route("/api/setEmotion/<user_id>/<device_id>", methods=['GET', 'POST'])
def set_user_emotion(user_id, device_id):
    user = User.query.filter_by(username=user_id).first()
    emotion = Emotion.query.filter_by(user_id=user.id).order_by(Emotion.date.desc()).first()
    emotion.result = request.form['emotion']
    db.session.add(emotion)
    db.session.commit()

    return jsonify({'result': True, 'save_id': emotion.id})


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
        today_emotion = Emotion.query.filter_by(user_id=user.id).order_by(Emotion.date.desc()).first()

        selected_question = select_question_process(today, today_emotion.result)

        return_data["code"] = 200
        return_data["data"] = {'q_id': selected_question.id, 'q_text': selected_question.content}

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


# 감정정보 분석 함수
def analysis_emotion_process(emotion_data):

    # lists
    temp = emotion_data['emotion'].items()
    emotion_list = list(temp)
    emotion_list.sort(key=lambda x: x[1])

    # Emotion 분석 시작
    if emotion_list[emotion_list.__len__() - 1][0] in 'neutral':
        if emotion_list[emotion_list.__len__()-1][1] > 0.980:
            user_emotion = emotion_list[emotion_list.__len__() - 1][0]
        else:
            user_emotion = emotion_list[emotion_list.__len__() - 2][0]
    else:
        user_emotion = emotion_list[emotion_list.__len__() - 1][0]

    return user_emotion


# 질문 선택 함수
def select_question_process(today, today_emotion):

    selected_question = Question.query.filter_by(tag1=today).first()

    if selected_question is None:
        selected_question = Question.query.filter_by(emotion=today_emotion).first()

    if selected_question is None:
        rand = random.randrange(0, Question.query.count())
        selected_question = Question.query[rand]

    return selected_question


def init_database():
    with app.app_context():
        db.create_all()


if __name__ == '__main__':
    init_database()
    app.run(port=5000, debug=True)