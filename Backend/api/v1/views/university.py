#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.university import University
from models.user import User
from models import storage
import random
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from flask_mail import Mail, Message
from os import environ
from datetime import datetime, timedelta


@app_views.route('/university/<user_id>', methods=["POST"], strict_slashes=False)
def post_university(user_id):
    """
        CREATE  a new university
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    requiredField = ["university", "College", "department", "level","university_code"]
    for i in requiredField:
        if i not in data:
            abort(400, description=f"Missing {i}")

    instance = University(**data)
    instance.save()
    user = storage.get_id(User, user_id)
    if not user:
        abort(404)
    user.university = instance
    user.save()

    return jsonify(instance.to_dict()), 201