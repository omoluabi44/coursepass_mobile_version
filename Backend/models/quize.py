#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, JSON
from sqlalchemy.orm import relationship


class Quize(BaseModel, Base):
    __tablename__ = 'quizes'
    courseID = Column(String(120), ForeignKey('courses.courseID') , nullable=False )
    university_code =  Column(String(128), nullable=False)
    questionText = Column(String(255), nullable=False, unique=False)
    correct_answer = Column(String(120), nullable=False, unique=False)
    incorrect_answers = Column(JSON, nullable=False, unique=False)
    explanation=  Column(String(500), nullable=False, unique=False)
    course_quize = relationship("Courses", back_populates="quize")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
   