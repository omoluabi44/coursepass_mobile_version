from flask import abort, jsonify, make_response, request
from api.v1.views import app_views
from models import storage
from models.course import Courses
from os.path import join, dirname
from flask_jwt_extended import  jwt_required
from flasgger.utils import swag_from



# Get all courses
@app_views.route('/courses', methods=['GET'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/courses/all_course.yml'))
# @jwt_required()
def get_all_courses():
    """
    Retrieves the list of all Courses.
    """
    courses = storage.all(Courses).values()
    return jsonify([course.to_dict() for course in courses])


# Get a specific course by ID
@app_views.route('/courses/<course_id>', methods=['GET'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/courses/get_course.yml'))
@jwt_required()
def get_course(course_id):
    """
    Retrieves a Course by its ID.
    """
    course = storage.get(Courses, course_id)
    if not course:
        abort(404)
    return jsonify(course.to_dict())


# Create a new course
@app_views.route('/course', methods=['POST'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/courses/post_course.yml'))
@jwt_required()
def post_course():
    """
    Creates a new Course.
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    requiredField = ["courseID", "courseName"]
    for i in requiredField:
        if i not in data:
            abort(400, description=f"Missing {i}")

    course = Courses(**data)
    course.save()
    return make_response(jsonify(course.to_dict()), 201)


# Update a course
@app_views.route('/course/<course_id>', methods=['PUT'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/courses/update_course.yml'))
# @jwt_required()
def put_course(course_id):
    """
    Updates an existing Course.
    """
    course = storage.get_id(Courses, course_id)
    if not course:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    ignore = ['id', 'created_at', 'updated_at']
    for key, value in data.items():
        if key not in ignore:
            setattr(course, key, value)
    course.save()
    return make_response(jsonify(course.to_dict()), 200)


# Delete a course
@app_views.route('/course/<course_id>', methods=['DELETE'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/courses/del_course.yml'))
@jwt_required()
def delete_course(course_id):
    """
    Deletes a Course by its ID.
    """
    course = storage.get_id(Courses, course_id)
    if not course:
        abort(404)
    storage.delete(course)
    storage.save()
    return make_response(jsonify({}), 200)
