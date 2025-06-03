from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from models import storage
from models.quize import Quize
from models.score import Score
from models.course import Courses
from models.user import User
from models.university import University
from models.streak import Streak
from models.note import Note
from models.note_view import NoteView
from models.enrollment import Enrollment
import os
from flask_jwt_extended import jwt_required
from os.path import join, dirname
from flasgger.utils import swag_from
from datetime import date, timedelta
from sqlalchemy import func
from sqlalchemy.orm import aliased
from sqlalchemy import over
from modules.ranking import get_all_rank, get_user_rank

session = storage._DBStorage__session

today = date.today()
yesterday = today - timedelta(days=1)



@app_views.route('/rank/<user_id>', methods=['GET'], strict_slashes=False)
def get_rank(user_id):
    user = storage.get_id(User, user_id)
    if not user:
        abort(404, description="User not found")
    
    users = get_all_rank(user_id)
    rank = []
    for index, i in enumerate(users):
        # print(index)
      
        for j in i.streak:
            user_rank =  {"username":i.username, "profile_url":i.profile_image, "point":j.point, "position":index + 1}
            rank.append(user_rank)
    return make_response(jsonify((rank)), 200)
      

    # user_dict = [user.to_dict() for user in users]
    # print(user_dict.username)
    # rank = []
    # for i in user_dict:
    #     {"username":i["username"], "point"}
    #     print(i["username"])
    # print(user_dict)
    return("user_dict")



@app_views.route('/streak/<user_id>', methods=['GET'], strict_slashes=False)
def get_streak(user_id):
    user = storage.get_id(User, user_id)
    if not user:
        abort(404, description="User not found")
    
    streak = next((s for s in user.streak), None)
    if not streak:
        return jsonify({
            "streak_day": 0,
            "point": 0,
            "streak_start_date": None,
            "last_active_date": None,
            "milestone": None,
            "today_xp": 0,

        })

    # Determine milestone
    milestone = None
    days = streak.streak_day

    if days >= 730:
        milestone = "🔥 2 Year Streak!"
    elif days >= 365:
        milestone = "🔥 1 Year Streak!"
    elif days >= 90:
        milestone = "🔥 90 Day Streak!"
    elif days >= 30:
        milestone = "🔥 30 Day Streak!"
    elif days >= 7:
        milestone = "🔥 7 Day Streak!"
   
  
    user_rank = get_user_rank(user_id)

    



    return jsonify({
        "streak_day": streak.streak_day,
        "point": streak.point,
        "streak_start_date": str(streak.streak_start_date),
        "last_active_date": str(streak.last_active_date),
        "milestone": milestone,
        "rank": user_rank
  
       
    })



@app_views.route('/point', methods=['POST'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/score/post_score.yml'))
def post_streak():
    """
    Creates a streak and point
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    
    quizes_attributes = ['note_id', 'userID']
    for i in quizes_attributes:
        if i not in data:
            abort(400, description=f"missing - {i}")
    user_id = data["userID"]
    note_id = data["note_id"]
   
    user = storage.get_id (User, user_id)
    note = storage.get_id (Note, note_id)
    note_view = session.query(NoteView).filter_by(userID=user_id, note_id=note_id).first()
    
   
    
    if not note_view:
        new_view = NoteView(userID=user_id, note_id=note_id, date_viewed=today)
        new_view.save()
        
        streak = session.query(Streak).filter_by(userID=user.id).first()
        if not streak:
            streak = Streak(userID=user.id,point=10,streak_day=1,streak_start_date=today,last_active_date=today )
            streak.save()       
        for streak in user.streak:
            if streak.last_active_date == today:
                pass
            elif streak.last_active_date == yesterday:
                streak.streak_day += 1
            else:
                streak.streak_day = 1
                streak.streak_start_date = today

            points_award = 10 + (streak.streak_day - 1)
            streak.point += points_award
            streak.last_active_date = today

            streak.save() 
        return(make_response(jsonify(streak.to_dict()),201))
        
        
        
    if  note_view and note_view.date_viewed  == today:

        return make_response("note alread viewed", 400)
    else:
        note_view.date_viewed = today
        note_view.save()
   
    streak = session.query(Streak).filter_by(userID=user.id).first()
    if not streak:
        streak = Streak(userID=user.id,point=10,streak_day=1,streak_start_date=today,last_active_date=today )
        streak.save()
        
    for streak in user.streak:
        if streak.last_active_date == today:
            pass
        elif streak.last_active_date == yesterday:
            streak.streak_day += 1
        else:
            streak.streak_day = 1
            streak.streak_start_date = today

        points_award = 2 + (streak.streak_day - 1) * 2
        streak.point += points_award
        streak.last_active_date = today

        streak.save() 
   
  
    return(make_response(jsonify(streak.to_dict()),201))
   
@app_views.route('/note_view/<note_id>', methods=['PUT'], strict_slashes=False)
# @swag_from(join(dirname(__file__), 'documentation/note/update_note.yml'))
# @jwt_required()
def put_point(note_id):
    """
    Updates existing Content.
    """
    view = storage.get_id(NoteView, note_id)
    if not view:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    ignore = ['id',  'created_at', 'updated_at', 'streak']
    for key, value in data.items():
        if key not in ignore:
            setattr(view, key, value)
    view.save()
    
    return make_response(jsonify(view.to_dict()), 200)

# @app_views.route('/score/<score_id>', methods=['DELETE'], strict_slashes=False)
# @swag_from(join(dirname(__file__), 'documentation/score/del_score.yml'))
# def del_score(score_id):
#     """
#     Deletes quize by its ID.
#     """
#     score = storage.get_id(Score, score_id)
#     if not score:
#         abort(404)
#     storage.delete(score)
#     storage.save()
#     return make_response(jsonify({}), 200)
