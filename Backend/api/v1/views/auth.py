"""  authentication API actions for Users """
from models.user import User
from models import storage
import random
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from flask_jwt_extended import (
                                create_access_token,  
                                create_refresh_token, 
                                jwt_required,
                                get_jwt_identity, get_jwt

                                 )
from flask_mail import Mail, Message
from os import environ
from os.path import join, dirname
from datetime import datetime, timedelta
from modules.auth import generate_verification_code, send_verification_email, send_password_email

session = storage._DBStorage__session
@app_views.route('/auth/register', methods=["POST"], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/user/register_user.yml'))

def post_user():
    print("i executed")
    """
        CREATE  a new user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    requiredField = ["username", "password", "email","Lname", "Fname", "whatsap_num"]
    for i in requiredField:
        if i not in data:
            abort(400, description=f"Missing {i}")
    
    username = data.get("username")
    email = data.get("email")
    
    verification_code = str(random.randint(100000, 999999))
    expires_at = datetime.utcnow() + timedelta(hours=2)
   
   
    db_email = session.query(User).filter(User.email == email).first()
    db_username = session.query(User).filter(User.username == username).first() 
    
    if db_email and db_username and db_username.is_verified == False:
        sent = send_verification_email(
        recipient=data["email"],
        code=verification_code)
        if not sent:
            return make_response(jsonify({"error": "Failed to send verification email"}), 500)
        db_username.verification_code = verification_code
        db_username.save()
        return make_response(jsonify(db_username.to_dict()), 201)
    
    if db_email:
        # print(db_email)
        return make_response(jsonify({"error": "Email already exists"}), 400)

   
    if db_username:
        print(db_username)
        return make_response(jsonify({"error": "Username already exists"}), 400)
    
    
  
    
    sent = send_verification_email(
        recipient=data["email"],
        code=verification_code
    )
    if not sent:
        return make_response(jsonify({"error": "Failed to send verification email"}), 500)


    
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

   
    return make_response(jsonify(instance.to_dict()), 201)


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
    user_dict = user.to_dict()
    

    if not user:
        return make_response(jsonify({"error": "User not found"}), 404)
    if user.is_verified:
        return make_response(jsonify({"error": "User already verified"}), 400)

    if user.verification_code != code:
         return make_response(jsonify({"error": "Invalid Verification code"}), 400)
    
    if datetime.utcnow() > user.code_expires_at:
        return make_response(jsonify({"error": "Verification code expired"}), 400)
    user.is_verified = True
    user.verification_code = None
    
    storage.save()
  
    return make_response(jsonify(user_dict), 200)

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
        return jsonify({"error": "Invalid Password"}), 401
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

@app_views.route('/auth/refresh', methods=['POST'])
def refresh_token():
    data = request.get_json()
    if not data or 'refresh' not in data:
        return make_response(jsonify({"msg": "Missing refresh token in request body"}), 400)

    refresh_token = data['refresh']
    print("Received headers:", request.headers) 

    try:
        from flask_jwt_extended import decode_token
        decoded_token = decode_token(refresh_token)
        if decoded_token.get('type') != 'refresh':
            return make_response(jsonify({"msg": "Invalid token type, must be a refresh token"}), 401)

        identity = decoded_token['sub']  
        new_access_token = create_access_token(identity=identity)
        
        return make_response(jsonify({"access": new_access_token}))

    except Exception as e:
        return make_response(jsonify({"msg": "Invalid or expired refresh token"}), 401)
    
    
@app_views.route('/auth/change_password_request', methods=['POST'])
def change_password_request():
    # collect user email
    # not found - user does not exist
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'email' not in request.get_json():
         abort(400, description="Missing email")
    data = request.get_json()
    email = data["email"]
    user = storage.get_email(User, email)
    if not user:
        return make_response(jsonify({"error": "User not found"}), 404)
    new_code = generate_verification_code(user)
    print(new_code)
    send_password_email(recipient=user.email, code=new_code)
    return jsonify({
        "message": "password verification code sent",
        "expires_at": user.code_expires_at.isoformat() 
    }), 200


@app_views.route('/auth/reset_password', methods=['Post'], strict_slashes=False)
# @swag_from(join(dirname(__file__), 'documentation/user/put_user.yml'), methods=['PUT'])
# @jwt_required()
def reset_password():
    """
    change user password
    """
   
  
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'email' not in request.get_json():
         abort(400, description="Missing email")
    if 'code' not in request.get_json():
         abort(400, description="Missing code")
    if 'password' not in request.get_json():
         abort(400, description="Missing password")
    data = request.get_json()
    email = data["email"]
    if not email:
        abort(404)
    code = data["code"]
    user = storage.get_email(User, email)
    if datetime.utcnow() > user.code_expires_at:
        return make_response(jsonify({"error": "Verification code expired"}), 400)
    if user.verification_code != code:
         return make_response(jsonify({"error": "Invalid Verification code"}), 400)
    
    user.verification_code = None
    password = "password"
    for key, value in data.items():
        if key == "password":
            setattr(user, key, value)
    storage.save()
    return("successfull")