from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from models import storage
from models.quize import Quize
from models.course import Courses
from os.path import join, dirname
from flask_jwt_extended import  jwt_required
from flasgger.utils import swag_from

import os


@app_views.route('/courses/<course_id>/quize', methods=["GET"], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/quize/get_quiz.yml'))
@jwt_required()
def get_question(course_id):
    course = storage.get(Courses,course_id )
    if not course:
        abort(404)
    quizes_dict = [quize.to_dict() for quize in course.quize if quize.courseID == course_id]
    
   
    return make_response(jsonify(quizes_dict),200)

@app_views.route('/quize', methods=['POST'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/quize/post_quiz.yml'))
@jwt_required()
def post_quize():
    """
    Creates a quize
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'university_code' not in request.get_json():
        abort(400, description="Missing university_code")
       
    data = request.get_json()
    quizes_attributes = ['courseID', 'university_code', 'questionText', 'correct_answer', 'incorrect_answers', 'explanation']
    for i in quizes_attributes:
        if i not in data:
            abort(400, description=f"missing - {i}")

    instance = Quize(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app_views.route('/quize/<quize_id>', methods=['PUT'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/quize/update_quiz.yml'))
@jwt_required()
def put_quize(quize_id):
    """
    Updates an existing quize.
    """
    quize = storage.get_id(Quize, quize_id)
    if not quize:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    ignore = ['id', 'created_at', 'updated_at', 'incorrect_answers']
    for key, value in data.items():
        if key not in ignore:
            setattr(quize, key, value)
    if "incorrect_answers" in data:
        quize.incorrect_answers = data["incorrect_answers"]
        
    quize.save()
    return make_response(jsonify(quize.to_dict()), 200)

@app_views.route('/quize/<quize_id>', methods=['DELETE'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/quize/del_quiz.yml'))
@jwt_required()
def del_quize(quize_id):
    """
    Deletes quize by its ID.
    """
    question = storage.get_id(Quize, quize_id)
    if not question:
        abort(404)
    storage.delete(question)
    storage.save()
    return make_response(jsonify({}), 200)
