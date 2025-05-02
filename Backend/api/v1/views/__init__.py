#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.index import *
from api.v1.views.courses import *
from api.v1.views.outline import *
from api.v1.views.quize import *
from api.v1.views.users import *
from api.v1.views.note import *
from api.v1.views.score import *
from api.v1.views.university import *
from api.v1.views.enrollment import *
from api.v1.views.assignment import *
from api.v1.views.assignment import *
from api.v1.views.allocation import *
from api.v1.views.flashcard import *
from api.v1.views.auth import *
