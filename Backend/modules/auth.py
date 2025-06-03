
from models.user import User
from models import storage
import random
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from flask_jwt_extended import create_access_token,  create_refresh_token, jwt_required, get_jwt_identity
from flask_mail import Mail, Message
from os import environ
from os.path import join, dirname
from datetime import datetime, timedelta

def generate_verification_code(user):
    """generate new new code and reset expiration"""
    user.verification_code = str(random.randint(100000, 999999))
    user.code_expires_at = datetime.utcnow() + timedelta(hours=2)
    storage.save()
    return user.verification_code
def send_verification_email(recipient,code):
    from api.v1.app import mail
    subject = "Verify your coursepass account"
    body= f"Your account verification code is: {code}"
    msg = Message(subject=subject, body=body, recipients=[recipient])
    mail.send(msg)
    return 1
def send_password_email(recipient,code):
    from api.v1.app import mail
    subject = "Change your CoursePass password"
    body= f"code is: {code}"
    msg = Message(subject=subject, body=body, recipients=[recipient])
    mail.send(msg)
    return 1
