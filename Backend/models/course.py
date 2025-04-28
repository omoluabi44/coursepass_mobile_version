#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Courses(BaseModel, Base):
    __tablename__ = 'courses'
    courseID = Column(String(120), nullable=False, unique=True)
    courseName = Column(String(120), nullable=False, unique=True)

    
    outline = relationship("Outline", back_populates="course", cascade="all, delete-orphan")
    quize = relationship("Quize", back_populates="course_quize", cascade="all, delete-orphan")
    students = relationship("User", secondary="enrollments", back_populates="courses")
    assignments = relationship("Assignment",  back_populates="course", cascade="all, delete-orphan")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
   