import cognitive_face as CF
import requests as requests

from flask import Flask, request, session, redirect, url_for, render_template, flash
from models import db, User
from form import LoginForm, RegisterForm

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
        if user.password == form.password.data:
            session['current_user'] = form.username.data
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
        db.session.add(u)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('register.html', form=form)


@app.route('/logout')
def logout():
    del session['current_user']
    return redirect(url_for('index'))


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

        json = None

        result = process_request(json, request.data, headers, params)
        analysis_emotion(result[0]["faceAttributes"])

    else:
        CF.Key.set(KEY)
        CF.BaseUrl.set(BASE_URL)

        # You can use this example JPG or replace the URL below with your own URL to a JPEG image.
        img_url = 'https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/detection1.jpg'

        faces = CF.face.detect(img_url, True, False, "emotion")
        print(faces)

    return render_template('showFace.html', emotions=faces[0]["faceAttributes"]["emotion"], img=img_url)


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
    # lists
    temp = emotion_data['emotion'].items()
    emotion_list = list(temp)

    # sorted(emotionList, key=takeSecond)
    # emotion_list.sort(key=takeSecond)

    return emotion_list


def init_database():
    with app.app_context():
        db.init_app(app)
        db.create_all()


if __name__ == '__main__':
    init_database()
    app.run(port=5000)
