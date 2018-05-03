import cognitive_face as CF
from flask import Flask, request, session, redirect, url_for, render_template, flash
from models import db, User
from form import LoginForm, RegisterForm

app = Flask(__name__)
app.secret_key = 'Secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
KEY = 'ba18348cc0044f6d8e07630234f897d8'  # Replace with a valid subscription key (keeping the quotes in place).
BASE_URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'  # Replace with your regional Base URL


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

gi
@app.route("/api/getEmotion/<id>")
def get_face_api(id):

    CF.Key.set(KEY)
    CF.BaseUrl.set(BASE_URL)

    # You can use this example JPG or replace the URL below with your own URL to a JPEG image.
    img_url = 'https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/detection1.jpg'

    faces = CF.face.detect(img_url, True, False, "emotion")
    print(faces)
    return render_template('showFace.html', emotions=faces[0]["faceAttributes"]["emotion"], img=img_url)


def init_database():
    with app.app_context():
        db.init_app(app)
        db.create_all()


if __name__ == '__main__':
    init_database()
    app.run(port=5000)
