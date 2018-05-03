import bcrypt

from models import User, SALT


def test_user():
    name = 'ryun'
    passwd = 'aloha'
    u = User(username=name, password=passwd)
    assert u.username == name
    assert u.password == bcrypt.hashpw(passwd.encode(), SALT)
