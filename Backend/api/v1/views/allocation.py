from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from models import storage
from models.allocation import Allocation
from models.enrollment import Enrollment
from models.assignment import Assignment
from models.course import Courses
from modules.eligible_students import get_eligible_students
from datetime import datetime, date

import os

session = storage._DBStorage__session



@app_views.route('/allocation/user/<user_id>', methods=["GET"], strict_slashes=False)
def get_allocation(user_id):
    """
    get all allocation  by user id
    """

    allocations = session.query(Allocation).filter_by(userID=user_id).all()
    if not allocations:  
        abort(404, description="allocation not found")
    assignment_id = [allocation.assignmentID for allocation in allocations ]

    for i in assignment_id:
        assignment = storage.get_id(Assignment, i)
        if not assignment:
            abort(404, description="assignment not found")
        assignment_dict = assignment.to_dict()
    
    return(make_response(jsonify(assignment_dict),200))




@app_views.route('/allocation', methods=['POST'], strict_slashes=False)
# @swag_from('documentation/user/post_user.yml', methods=['POST'])
def post_allocation():
    """
    Creates a allocation
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    allocation_attributes = ['userID', 'courseID', 'assign_date', "assignmentID"]
    for i in allocation_attributes:
        if i not in data:
            abort(400, description=f"missing - {i}")
    assign_date = data.get('assign_date')

    #check if due_date is a string and in the correct format
    if not isinstance(assign_date, str):
        abort(400, description="due_date must be a string")
    try:
        data["assign_date"] = datetime.strptime(assign_date, '%Y-%m-%d').date()
    except ValueError:
        abort(400, description="due_date must be in YYYY-MM-DD format")
    #check if user is assigned to the course
   
    user_id = data["userID"]
    course_id = data["courseID"]
    enroll_user = storage.get_enroll_id(Enrollment,user_id,course_id )
    if not enroll_user:
        abort(400, description="you are not assigned to this course")
    
    eligible_students = get_eligible_students(user_id,course_id)
    assignment_students =[]
    for student in eligible_students:
        assignment_students.append(Allocation(userID=student,  assign_date=data["assign_date"], assignmentID=data["assignmentID"]))

    for i in assignment_students:
        print(i.to_dict())

    for i in assignment_students:
        instance = i
        instance.save()
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)
    


@app_views.route('/allocation/<allocation_id>', methods=['DELETE'], strict_slashes=False)
def del_allocation(allocation_id):
    """
    Deletes assignment by its ID.
    """
    allocation = storage.get_id(Allocation, allocation_id)
    if not allocation:
        abort(404)
    storage.delete(allocation)
    storage.save()
    return make_response(jsonify({}), 200)

