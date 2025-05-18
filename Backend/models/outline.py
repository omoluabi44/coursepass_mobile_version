#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey,Integer
from sqlalchemy.orm import relationship


class Outline(BaseModel, Base):
    __tablename__ = 'outline'
  
    courseID = Column(String(60), ForeignKey('courses.courseID', ondelete='CASCADE'), nullable=False)
    topic = Column(String(120), nullable=False)
    orderID = Column(Integer, nullable=False, )

    course = relationship("Courses", back_populates="outline")
    note = relationship("Note", back_populates="outlines", cascade="all, delete-orphan")
    flashcard = relationship("Flashcard", back_populates="outline",  cascade="all, delete-orphan")
   


    def __init__(self,*args, **kwargs):
        super().__init__(*args, **kwargs)
 