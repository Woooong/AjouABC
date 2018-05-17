import json

import cognitive_face as face_api
import requests as requests

from flask import Flask, request, session, redirect, url_for, render_template, flash
from models import db, User, Emotion
from form import LoginForm, RegisterForm
from bcrypt import checkpw

app = Flask(__name__)
app.secret_key = 'Secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
KEY = 'b07aafe6c35b45bdb8b19b1a45b410bb'  # Replace with a valid subscription key (keeping the quotes in place).
BASE_URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'  # Replace with your regional Base URL


_url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect'
_key = 'b07aafe6c35b45bdb8b19b1a45b410bb'
_maxNumRetries = 10


@app.route("/")
@app.route('/index')
def index():
    if 'current_user' in session:
        current_user = session['current_user']
        return render_template('index.html', current_user=current_user)
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST':
        user = User.query.filter_by(username=form.username.data).first()
        if checkpw(form.password.data.encode('utf-8'), user.password):
            session['current_user'] = form.username.data
            flash('Success Login')
            return redirect(url_for('index'))
        else:
            flash('Invalid username or password')
            return redirect((url_for('login')))
    return render_template('login.html', form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if request.method == 'POST':
        u = User(username=form.username.data, password=form.password.data)
        #u = User(username="uram", password="201221029")
        db.session.add(u)
        db.session.commit()
        flash('Success Register')
        return redirect(url_for('index'))
    return render_template('register.html', form=form)


@app.route('/logout')
def logout():
    del session['current_user']
    return redirect(url_for('login'))


# 감정 조회
@app.route("/api/getEmotion/<user_id>/<device_id>", methods=['GET', 'POST'])
def get_face_api(user_id, device_id):

    if request.method == 'POST':
        # Face detection parameters
        params = {'returnFaceAttributes': 'emotion,age,gender',
                  'returnFaceLandmarks': 'true'}

        headers = dict()
        headers['Ocp-Apim-Subscription-Key'] = _key
        headers['Content-Type'] = 'application/octet-stream'

        api_result = process_request(None, request.data, headers, params)

    else:
        face_api.Key.set(KEY)
        face_api.BaseUrl.set(BASE_URL)

        # You can use this example JPG or replace the URL below with your own URL to a JPEG image.
        img_url = 'https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/detection1.jpg'

        api_result = face_api.face.detect(img_url, True, False, 'emotion,age,gender')

    user = User.query.filter_by(username=user_id).first()
    user_emotion = str(json.dumps(api_result[0]["faceAttributes"]["emotion"]))
    represent_emotion = analysis_emotion(api_result[0]["faceAttributes"])

    e = Emotion(user=user, str=user_emotion, res=represent_emotion)
    db.session.add(e)
    db.session.commit()

    return_data = json.loads(user_emotion)
    return_data["represent_emotion"] = represent_emotion

    return return_data
    # return render_template('showFace.html', emotions=api_result[0]["faceAttributes"]["emotion"], img=img_url)


# octet-stream API REQ Func
def process_request(json, data, headers, params):
    retries = 0
    result = None

    while True:

        response = requests.request('post', _url, json=json, data=data, headers=headers, params=params)

        if response.status_code == 429:

            print("Message: %s" % (response.json()['error']['message']))

            # if retries <= _maxNumRetries:
            #     time.sleep(1)
            #     retries += 1
            #     continue
            # else:
            #     print('Error: failed after retrying!')
            #     break

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


def analysis_emotion(emotion_data):
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


def init_database():
    with app.app_context():
        db.init_app(app)
        db.create_all()


if __name__ == '__main__':
    init_database()
    app.run(port=5000)
