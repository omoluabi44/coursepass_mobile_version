#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
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


# from api.v1.app import mail


@app_views.route('/users', methods=["GET"], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/user/all_users.yml'))
@jwt_required()
def get_users():
    """
    retrieve  all user object
    """
   
    all_users = storage.all(User).values()
    list_users = []
    for user in all_users:
        list_users.append(user.to_dict())
    return jsonify(list_users)
    
@app_views.route('/user/<user_id>', methods=["GET"], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/user/get_user.yml'))
# @jwt_required()
def get_user(user_id):
    """
    retrieve  specific  user object using id
    """
    user= storage.get_id(User, user_id)
    print(user_id)
    print(user)
    if not user:
          abort(404)
    user_dict = user.to_dict()
 
    if user.university:
        user_dict["university"] = user.university.to_dict()
    else:
        user_dict["university"] = None
    
    return jsonify(user_dict)






 
@app_views.route('/email', methods=["POST"], strict_slashes=False)
def send_email():
    from api.v1.app import mail
    
    data = request.get_json()
    subject = data["subject"]
    recipient = data["recipient"]
    body = data["body"]

    if not (subject and recipient and body):
        return 'Invalid request. Please provide subject, recipient, and body parameters.'

    msg = Message(subject=subject,  recipients=[recipient])
    msg.body = body
    mail.send(msg)

    return 'Email sent successfully!'


@app_views.route('/user/<user_id>', methods=['PUT'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/user/put_user.yml'), methods=['PUT'])
@jwt_required()
def update_user(user_id):
    """
    Updates an existing user.
    """
    user = storage.get_id(User, user_id)
    if not user:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    ignore = ['id', 'created_at', 'updated_at', 'university']
    for key, value in data.items():
        if key not in ignore:
            setattr(user, key, value)
    if "university" in data:
        university_data = data["university"]

        university = user.university
        if not university:
            abort (404, description="university not found")
        for key, value in university_data.items():
            if key not in ignore:
                setattr(university, key, value) 

    user.save()
    user_dict = user.to_dict()
    if user.university:
        user_dict['university'] = user.university.to_dict()
    else:
        user_dict['university'] = None
        
    return make_response(jsonify(user_dict), 200)
@app_views.route('/user/<user_id>', methods=['DELETE'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/user/delete_user.yml'))
# @jwt_required()
def del_user(user_id):
    """
    Deletes user by its ID.
    """
    user = storage.get_id(User, user_id)
    print(user)
    if not user:
        abort(404)
    storage.delete(user)
    storage.save()
    return make_response(jsonify({}), 200)

