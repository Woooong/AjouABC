from flask import Flask, render_template
from models import db, User
import cognitive_face as CF

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

KEY = 'ba18348cc0044f6d8e07630234f897d8'  # Replace with a valid subscription key (keeping the quotes in place).
BASE_URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'  # Replace with your regional Base URL


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/user/showAll")
def show_user():
    users = User.query.order_by(User.username).all()
    return render_template('users.html', users=users)


@app.route("/user/new")
def new_user():
    u = User(username='uram', password='12345678')
    db.session.add(u)
    db.session.commit()
    return "OK"


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
