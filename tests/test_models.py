import json

import bcrypt
from datetime import date, datetime

from models import User, SALT, Emotion


def test_user():
    name = 'ryun'
    passwd = 'aloha'
    u = User(username=name, password=passwd)
    assert u.username == name
    assert u.password == bcrypt.hashpw(passwd.encode(), SALT)


def test_create_emotion():
    str = '''{
            "anger": 0.037,
            "contempt": 0.001,
            "disgust": 0.015,
            "fear": 0.001,
            "happiness": 0.939,
            "neutral": 0.001,
            "sadness": 0.0,
            "surprise": 0.007
          }'''

    u = User(username='ryun', password='aloha')
    e = Emotion(user=u, str=str, date=date.today())

    parsed = json.loads(str)
    assert parsed['anger'] == e.anger
    assert parsed['contempt'] == e.contempt
    assert parsed['disgust'] == e.disgust
    assert parsed['fear'] == e.fear
    assert parsed['happiness'] == e.happiness
    assert parsed['neutral'] == e.neutral
    assert parsed['sadness'] == e.sadness
    assert parsed['surprise'] == e.surprise

    assert date.today() == e.date


def test_user_create_emotion():
    u = User(username='ryun', password='aloha')
    u.id = 1
    str = '''{
        "anger": 0.037,
        "contempt": 0.001,
        "disgust": 0.015,
        "fear": 0.001,
        "happiness": 0.939,
        "neutral": 0.001,
        "sadness": 0.0,
        "surprise": 0.007
      }'''

    e = Emotion(user=u, str=str, date=date.today())
    u.append_emotion(e)
    assert u.emotions[0] == e


def test_create_date_type():
    d = datetime.now().date()

    assert str(d) == '2018-05-14'
