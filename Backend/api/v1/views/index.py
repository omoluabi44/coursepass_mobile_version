#!/usr/bin/python3
""" Index """
from models.course import Courses
from models import storage
from models.outline import Outline
from models.quize import Quize
from models.university import University
from api.v1.views import app_views
from flask import jsonify
from models.note import Note
from models.enrollment import Enrollment
from models.assignment import Assignment
from models.allocation import Allocation
from models.flashcard import  Flashcard
from models.universities import Universities
from models.department import Department
from models.college import College
from models.streak import  Streak
from models.note_view import  NoteView

@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def number_objects():
    """ Retrieves the number of each objects by type """
    classes = [Courses,Outline,Questions, User, University, 
               Note, Quize, Enrollment, Assignment, Allocation 
               ,Flashcard, Universities, College,Department,
               NoteView, Streak
               ]
    names = ["courses",  "outline", "questions", "user", "university", 
             "note", "quize", "enrollment", "assignment", "allocation",
             "flashcard", "universities", "College","Department",
             "Streak","NoteView"
             ]

    num_objs = {}
    for i in range(len(classes)):
        num_objs[names[i]] = storage.count(classes[i])

    return jsonify(num_objs)
