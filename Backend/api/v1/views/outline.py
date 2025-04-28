from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from models import storage
from models.outline import Outline
from models.course import Courses

import os

@app_views.route('/courses/<course_id>/outline', methods=['GET'], strict_slashes=False)
def get_course_content(course_id):
    """
    Retrieves the list of all outline for a specific Course.
    """
    course = storage.get(Courses, course_id)
    if not course:
        abort(404)
    for outline in course.outline:
        if outline.courseID == course_id:
            print(outline.topic)
        

    course_dict = [outline.to_dict() for outline in course.outline if outline.courseID == course_id]
    return jsonify(course_dict)


# Get a specific content by ID
@app_views.route('/outline/<outline_id>', methods=['GET'], strict_slashes=False)
def get_content(outline_id):
    """
    
    Retrieves a specific Content by its ID.
    """
    outline = storage.get_id(Outline, outline_id)
    if not outline:
        abort(404)
    return jsonify(outline.to_dict())


@app_views.route('/outline', methods=['POST'], strict_slashes=False)
def post_content():
    """
    Creates new outline for a specific Course.
    """
    
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    outline_attributes = ['topic', 'courseID', 'orderID']
    for i in outline_attributes:
        if i not in data:
            abort(400, description=f"missing - {i}")
    course_id = data.get('courseID')

    course = storage.get(Courses, course_id)
    if not course:
         abort(404, description="course not found")
    outline = Outline(**data)  
    outline.save()
  
    return make_response(jsonify(outline.to_dict()), 201)



# Update content
@app_views.route('/outline/<outline_id>', methods=['PUT'], strict_slashes=False)
def put_content(outline_id):
    """
    Updates existing Content.
    """
    content = storage.get_id(Outline, outline_id)
    if not content:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    ignore = ['id', 'course_id', 'created_at', 'updated_at']
    for key, value in data.items():
        if key not in ignore:
            setattr(content, key, value)
    content.save()
    return make_response(jsonify(content.to_dict()), 200)


# Delete content
@app_views.route('/outline/<outline_id>', methods=['DELETE'], strict_slashes=False)
def delete_content(outline_id):
    """
    Deletes Content by its ID.
    """
    content = storage.get_id(Outline, outline_id)
    if not content:
        abort(404)
    storage.delete(content)
    storage.save()
    return make_response(jsonify({}), 200)
