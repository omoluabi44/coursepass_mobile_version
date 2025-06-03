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
from modules.s3_bucket import upload_to_s3
from werkzeug.utils import secure_filename


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
    ignore = ['id', 'created_at', 'updated_at', 'university', 'streak']

    # Update simple user fields
    for key, value in data.items():
        if key not in ignore:
            setattr(user, key, value)

    # Update nested university fields if present
    if "university" in data:
        university_data = data["university"]
        university = user.university
        if not university:
            abort(404, description="university not found")
        for key, value in university_data.items():
            if key not in ignore:
                setattr(university, key, value)

    # Update streak if present
    if "streak" in data:
        streak_data = data["streak"]

        # user.streak is a list, not a single object
        if not user.streak or len(user.streak) == 0:
            abort(404, description="streak not found")

        streak = user.streak[0]  # Assuming one streak per user
        for key, value in streak_data.items():
            if key not in ignore:
                setattr(streak, key, value)

    # Save changes
    user.save()

    # Prepare response
    user_dict = user.to_dict()
    user_dict['university'] = user.university.to_dict() if user.university else None
    user_dict['streak'] = [s.to_dict() for s in user.streak] if user.streak else []

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

@app_views.route('/user/upload_profile_image', methods=['POST'],  strict_slashes=False)
def upload_profile_image():
    
    print(request.form)
    image_file = request.files['image']
    user_id = request.form['user_id']  # Metadata from frontend
    
    user = storage.get_id(User, user_id)
    # Generate unique filename using user metadata
    filename = secure_filename(f"{user_id}_{image_file.filename}")

    # Upload to S3 and get custom URL
    bucket_name = 'coursepass-profile-bucket'
    s3_url = upload_to_s3(image_file, bucket_name, filename)

    if not  s3_url:
        # Save URL to database (example using a hypothetical DB)
        # Replace with your actual database logic (e.g., SQLAlchemy, MongoDB)
        # db.users.update({'_id': user_id}, {'profile_image': s3_url})
        return make_response(jsonify({'success': False, 'error': 'Upload failed'}), 500)
    user.profile_image = s3_url
    user.save()
    print(f"Saving to DB: {s3_url}")  # Placeholder
    return make_response(jsonify({'success': True, 'url': s3_url}), 200)
  

