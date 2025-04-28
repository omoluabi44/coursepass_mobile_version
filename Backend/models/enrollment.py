#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from models.user import User


class Enrollment(BaseModel, Base):
    __tablename__ = 'enrollments'
    courseID = Column(String(120), ForeignKey('courses.courseID'), nullable=False, ) 
    userID = Column(String(120), ForeignKey('users.id'), nullable=False)
    scores = relationship("Score", back_populates="enrollment",  cascade="all, delete-orphan")
    flashcard = relationship("Flashcard", back_populates="enrollment",  cascade="all, delete-orphan")




    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
