from flask import Flask
from models import db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/user/new")
def new_user():
    u = User(username='ryun', password='12345678')
    db.session.add(u)
    db.session.commit()
    return "OK"


def init_database():
    with app.app_context():
        db.init_app(app)
        db.create_all()


if __name__ == '__main__':
    init_database()
    app.run(port=5000)
