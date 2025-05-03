from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from models import storage
from models.user import User
from models.course import Courses
from models.enrollment import Enrollment
import os
from os.path import join, dirname
from flask_jwt_extended import  jwt_required
from flasgger.utils import swag_from



# @app_views.route('/enrollments/<enroll_id>/', methods=["GET"], strict_slashes=False)
# def get_enrollment(enroll_id):
#     course = storage.get_id(Enrollment,enroll_id )
#     if not course:
#         abort(404)
#     quizes_dict = [quize.to_dict() for quize in course.quize if quize.courseID == course_id]
    

#     return make_response(jsonify(quizes_dict),200)

@app_views.route('/enrollment/user/<user_id>/', methods=["GET"], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/enrollment/all_enrollment.yml'))
@jwt_required()
def get_enrollment_user(user_id):
    user = storage.get_id(User,user_id )
    if not user:
        abort(404)
    user_course_dict = [user.to_dict() for user in user.courses]

    return make_response(jsonify(user_course_dict),200)
@app_views.route('/enrollment/course/<course_id>/', methods=["GET"], strict_slashes=False)
def get_enrollment_course(course_id):
    course = storage.get(Courses,course_id ) 
   
    course_dict = [course.to_dict() for course in course.students]

    return make_response(jsonify(course_dict),200)


    
 
@app_views.route('/enrollment', methods=['POST'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/enrollment/post_enrollment.yml'))
@jwt_required()
def post_enrollment():
    """
    Creates a quize
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
       
    data = request.get_json()
    user_id = data.get('userID')
    user = storage.get_id(User,user_id )
    print(user)
    if not user:
        abort(404)
    # get user enroll courses
    user_courses = []
    for i in user.courses:
        user_courses.append(i.courseID)

   
    quizes_attributes = ['courseID', 'userID',]
    for i in quizes_attributes:
        if i not in data:
            abort(400, description=f"missing - {i}")
    for j in user_courses:
        if j == data['courseID']:
            abort(400, description="Already enrolled in this course")

    instance = Enrollment(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/enrollment/<enrollment_id>', methods=['PUT'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/enrollment/update_enrollment.yml'))
@jwt_required()
def put_enrollment(enrollment_id):
    """
    Updates an existing enrollment .
    """
    enrollment = storage.get_id(Enrollment, enrollment_id)
    print(enrollment)
    if not enrollment:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    if 'userID' in data:
        user = storage.get_id(User, data['userID'])
        if not user:
            abort(400, description="the user does not exist")
    if 'courseID' in data:  
        course = storage.get_id(Courses, data['courseID'])
        if not course:
            abort(400, description="the course does not exist")
    ignore = ['id', 'created_at', 'updated_at',]
    for key, value in data.items():
        if key not in ignore:
            setattr(enrollment, key, value)
   
        
    enrollment.save()
    return make_response(jsonify(enrollment.to_dict()), 200)

@app_views.route('/enrollment/<enrollment_id>', methods=['DELETE'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/enrollment/del_enrollment.yml'))
@jwt_required()
def del_enrollment(enrollment_id):
    """
    Deletes enrollment by its ID.
    """
    enrollment = storage.get_id(Enrollment, enrollment_id)
    if not enrollment:
        abort(404)
    storage.delete(enrollment)
    storage.save()
    return make_response(jsonify({}), 200)
