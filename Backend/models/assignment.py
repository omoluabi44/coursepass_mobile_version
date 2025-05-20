#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, JSON, Integer,Date
from sqlalchemy.orm import relationship


class Assignment(BaseModel, Base):
    __tablename__ = 'assignments'
    courseID = Column(String(120), ForeignKey('courses.courseID',ondelete='CASCADE') , nullable=False )
    title = Column(String(120), nullable=False )
    due_date = Column(Date, nullable=False,)
    detail = Column(String(400), nullable=False)
    course = relationship("Courses", back_populates="assignments")
    allocation = relationship("Allocation", back_populates="assignment",  cascade="all, delete-orphan")
   

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
   