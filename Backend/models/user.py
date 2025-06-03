#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey,Boolean,DateTime,Integer
from sqlalchemy.orm import relationship
import bcrypt
from datetime import datetime, timedelta

class User(BaseModel, Base):
    __tablename__= "users"
    Fname =  Column(String(128), nullable=False)
    Lname =  Column(String(128), nullable=False)
    username =  Column(String(128), nullable=False, unique=True)
    password =  Column(String(128), nullable=False)
    email =  Column(String(128), nullable=False, unique=True)
    verification_code = Column(String(6), nullable=True)
    is_verified = Column(Boolean, default=False)
    code_expires_at = Column(DateTime, nullable=True)
    universityID = Column(String(60), ForeignKey("university.id"), nullable=True)
    whatsap_num =  Column(String(20), nullable=True)
    role = Column(String(60), nullable=True)
    profile_image = Column(String(128), nullable=True)
  

    
    university = relationship("University", back_populates="student")
    courses = relationship("Courses", secondary="enrollments", overlaps="enrollment", back_populates="students")
    allocation = relationship("Allocation", back_populates="students",  cascade="all, delete-orphan")
    enrollment = relationship("Enrollment", cascade="all, delete-orphan",overlaps="courses", back_populates="user")
    streak = relationship("Streak", cascade="all, delete-orphan", back_populates="user")
    note_view = relationship("NoteView", cascade="all, delete-orphan", back_populates="user")


    def __init__(self, *args, **kwargs):
        """initialize user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """set a password with md5 encryption"""
        if name == "password":
            value = value.encode('utf-8')

            value = bcrypt.hashpw(value, bcrypt.gensalt(10))
        super().__setattr__(name, value)
    def check_password(self, password):
        """
        verify provided passord
        """
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

