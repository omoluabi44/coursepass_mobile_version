#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from models.user import User


class Flashcard(BaseModel, Base):
    __tablename__ = 'Flashcards'
    # enrollmentID = Column(String(120), ForeignKey('enrollments.id', ondelete='CASCADE'), nullable=False)
    userID = Column(String(120), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    courseID = Column(String(120), ForeignKey('courses.courseID', ondelete='CASCADE'), nullable=False)
    outlineID = Column(String(120), ForeignKey('outline.id', ondelete='CASCADE'), nullable=False)
    question = Column(String(120), nullable=False)
    answer = Column(String(120), nullable=False)

    course = relationship("Courses", back_populates="flashcard",  )
    outline = relationship("Outline", back_populates="flashcard",  )




    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
