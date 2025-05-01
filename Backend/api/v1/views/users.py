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
@jwt_required()
def get_user(user_id):
    """
    retrieve  specific  user object using id
    """
    user= storage.get_id(User, user_id)
    if not user:
          abort(404)
    user_dict = user.to_dict()
    if user.university:
        user_dict["university"] = user.university.to_dict()
    else:
        user_dict["university"] = None
    
    return jsonify(user_dict)
    
@app_views.route('/auth/register', methods=["POST"], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/user/register_user.yml'))

def post_user():
    """
        CREATE  a new user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    requiredField = ["username", "password", "email","Lname", "Fname"]
    for i in requiredField:
        if i not in data:
            abort(400, description=f"Missing {i}")
   
    verification_code = str(random.randint(100000, 999999))
    expires_at = datetime.utcnow() + timedelta(hours=2)

    print(verification_code)
    
    user_data ={
    "username": data["username"],
    "email": data["email"],
    "password": data["password"],
    "verification_code": verification_code,
    "is_verified":False,
    "code_expires_at": expires_at, 
    "Fname": data.get("Fname"),
    "Lname": data.get("Lname"),
    }
    instance = User(**user_data)
    instance.save()

    send_verification_email(
        recipient=data["email"],
        code=verification_code
    )
    return make_response(jsonify(instance.to_dict()), 201)

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

@app_views.route('/auth/resend_code', methods=["POST"], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/user/resend.yml'))
def resend_code():
    """ resend verification code"""
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    if not data or 'email' not in data:
        abort(400, description="Email required")
    
    if not data or 'username' not in data:
        abort(400, description="username required")
    
    username = data["username"]
    user = storage.get_username(User, username)
    if user.is_verified:
        return jsonify({"error": "User already verified"}), 400

    new_code = generate_verification_code(user)
    print(new_code)
    send_verification_email(recipient=user.email, code=new_code)
    return jsonify({
        "message": "New verification code sent",
        "expires_at": user.code_expires_at.isoformat() 
    }), 200




@app_views.route('/auth/verify', methods=["POST"], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/user/verify.yml'))
def verify():
    """ verify user account"""
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    requiredField = ["username", "code", "email"]
    for i in requiredField:
        if i not in data:
            abort(400, description=f"Missing {i}")
    username = data["username"]
    code = data["code"]
    user = storage.get_username(User, username)

    if not user:
        return jsonify({"error": "User not found"}), 404
    if user.is_verified:
        return jsonify({"error": "User already verified"}), 400

    if user.verification_code != code:
         return jsonify({"error": "Invalid Verification code"}), 400
    
    if datetime.utcnow() > user.code_expires_at:
        return jsonify({"error": "Verification code expired"})
    user.is_verified = True
    user.verification_code = None
    storage.save()
    return jsonify({"message":"verify!"})


@app_views.route('/auth/login', methods=["POST"], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/user/login.yml'))
def login_user():
    """
        login  a  user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'username' not in request.get_json():
         abort(400, description="Missing username")
    if 'password' not in request.get_json():
         abort(400, description="Missing password")

    data = request.get_json()
    username = data["username"]
    password = data["password"]

    user = storage.get_username(User, username)
    if not user:
        return make_response(jsonify({"error": f"User {username}  not found"}), 404)

    if not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401
    if not user.is_verified:
        return jsonify({"error": "account not verified"}), 403
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    return jsonify( 
        {   
            "tokens":{
                "access": access_token,
                "refresh":refresh_token
            },
            "user":{
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "Fname": user.Fname,
                "Lname": user.Lname,
         
            }
        }
        
        ), 200


 
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
def del_user(user_id):
    """
    Deletes user by its ID.
    """
    user = storage.get_id(User, user_id)
    if not user:
        abort(404)
    storage.delete(user)
    storage.save()
    return make_response(jsonify({}), 200)