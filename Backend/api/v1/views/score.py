from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from models import storage
from models.quize import Quize
from models.score import Score
from models.course import Courses
from models.enrollment import Enrollment
import os
from flask_jwt_extended import jwt_required
from os.path import join, dirname
from flasgger.utils import swag_from

session = storage._DBStorage__session



@app_views.route('/score/<user_id>/<course_id>', methods=["GET"], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/score/get_score.yml'))
@jwt_required()
def get_score(user_id,course_id):
    """
    get score by user id and course id
    """
    enroll_user = storage.get_enroll_id(Enrollment,user_id,course_id )
    if not enroll_user:
        abort(404)
    enroll_user_id = enroll_user.id
    course = session.query(Score).filter_by(enrollmentID=enroll_user_id).all()
    scores = []
    for i in course:
        scores.append(i.score)
    
    score_course =[course_id, scores]
    
    

    return(make_response(jsonify(score_course),200))

@app_views.route('/score/<user_id>/', methods=["GET"], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/score/all_score.yml'))
def get_all_score(user_id,):
    """
    get  user all scores
    """
   
    course = session.query(Enrollment).filter_by(userID=user_id).all()
    if not course:
        abort(404)
    enroll_id_course = []

    for i in course:
        enroll_id_course.append({"id": i.id, "courseID": i.courseID})
    all_score = [] 
    for j in enroll_id_course:
        enroll_user_id = j["id"]
        course_id = j["courseID"]
        course = session.query(Score).filter_by(enrollmentID=enroll_user_id).all()
        scores = []
        for i in course:
            scores.append(i.score)
        score_course =[course_id, scores]
        all_score.append(score_course)
 

    return(make_response(jsonify(all_score),200))



@app_views.route('/score', methods=['POST'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/score/post_score.yml'))
def post_score():
    """
    Creates a score
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    quizes_attributes = ['courseID', 'userID', 'score']
    for i in quizes_attributes:
        if i not in data:
            abort(400, description=f"missing - {i}")

    course_id=data["courseID"]
    user_id= data["userID"]
    # print(user_id, course_id)  
    enroll_user = storage.get_enroll_id(Enrollment,user_id,course_id )
    if not enroll_user:
        abort(404)
    enroll_user_id = enroll_user.id
    
    data["enrollmentID"] = enroll_user_id

    instance = Score(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)
    # return("success")

@app_views.route('/score/<score_id>', methods=['DELETE'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/score/del_score.yml'))
def del_score(score_id):
    """
    Deletes quize by its ID.
    """
    score = storage.get_id(Score, score_id)
    if not score:
        abort(404)
    storage.delete(score)
    storage.save()
    return make_response(jsonify({}), 200)
