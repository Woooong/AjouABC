import json

from datetime import date, datetime
from flask_sqlalchemy import SQLAlchemy
import bcrypt

db = SQLAlchemy()
SALT = b'$2b$12$lkx75uvI9VwWAAIErNb/7.'


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    emotions = db.relationship('Emotion', backref='user', lazy=True)

    def __init__(self, username, password):
        self.username = username
        self.password = bcrypt.hashpw(password.encode(), SALT)

    def __repr__(self):
        return '<User %r>' % self.username

    def append_emotion(self, e):
        e.user = self


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
    result = db.Column(db.String(10))

    def __init__(self, user, str, res, date=datetime.now().date()):
        self.user_id = user.id
        self.date = date
        self.result = res
        self._parse(str)
        # self._calculate_result()

    def _parse(self, str):
        e = json.loads(str)
        self.anger = e['anger']
        self.contempt = e['contempt']
        self.disgust = e['disgust']
        self.fear = e['fear']
        self.happiness = e['happiness']
        self.neutral = e['neutral']
        self.sadness = e['sadness']
        self.surprise = e['surprise']

    def _calculate_result(self):
        self.result = ''


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000), nullable=True)
