from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from models import storage
from models.assignment import Assignment
from models.course import Courses
from datetime import datetime, date

import os

session = storage._DBStorage__session



@app_views.route('/assignment/<course_id>', methods=["GET"], strict_slashes=False)
def get_assignment(course_id):
    """
    get assignemnt by course id
    """

    assignemnts = session.query(Assignment).filter_by(courseID=course_id).all()
    if not assignemnts:  
        abort(404, description="Assignment not found")
    assignemnt = [assignment.to_dict() for assignment in assignemnts]

    return(make_response(jsonify(assignemnt),200))




@app_views.route('/assignment', methods=['POST'], strict_slashes=False)
# @swag_from('documentation/user/post_user.yml', methods=['POST'])
def post_assignment():
    """
    Creates a assignment
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    quizes_attributes = ['courseID', 'title', 'due_date']
    for i in quizes_attributes:
        if i not in data:
            abort(400, description=f"missing - {i}")
    due_date = data.get('due_date')
    if not isinstance(due_date, str):
        abort(400, description="due_date must be a string")
    try:
        data["due_date"] = datetime.strptime(due_date, '%Y-%m-%d').date()
    except ValueError:
        abort(400, description="due_date must be in YYYY-MM-DD format")
    course_id = data["courseID"]
    course = storage.get(Courses, course_id)
    if not course:
        abort(400, description="courseID does not exist")
    
    instance = Assignment(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)
    # return("success")
@app_views.route('/assignment/<assignment_id>', methods=['PUT'], strict_slashes=False)
def put_assignment(assignment_id):
    """
    Updates an existing assignment.
    """
    assignemnt = storage.get_id(Assignment, assignment_id)
    if not assignemnt:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    ignore = ['id', 'created_at', 'updated_at', ]
    for key, value in data.items():
        if key not in ignore:
            setattr(assignemnt, key, value)
 
        
    assignemnt.save()
    return make_response(jsonify(assignemnt.to_dict()), 200)

@app_views.route('/assignment/<assignment_id>', methods=['DELETE'], strict_slashes=False)
def del_assignment(assignment_id):
    """
    Deletes assignment by its ID.
    """
    score = storage.get_id(Assignment, assignment_id)
    if not score:
        abort(404)
    storage.delete(score)
    storage.save()
    return make_response(jsonify({}), 200)
