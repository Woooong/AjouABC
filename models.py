from flask_sqlalchemy import SQLAlchemy
import bcrypt
db = SQLAlchemy()
SALT = b'$2b$12$lkx75uvI9VwWAAIErNb/7.'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    emotion = db.relationship('Emotion', backref='user', lazy=True)

    def __init__(self, username, password):
        self.username = username
        self.password = bcrypt.hashpw(password.encode(), SALT)

    def __repr__(self):
        return '<User %r>' % self.username


class Emotion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    anger = db.Column(db.Float)
    contempt = db.Column(db.Float)
    disgust = db.Column(db.Float)
    fear = db.Column(db.Float)
    happiness = db.Column(db.Float)
    neutral = db.Column(db.Float)
    sadness = db.Column(db.Float)
    surprise = db.Column(db.Float)