#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, JSON, Integer,Date
from sqlalchemy.orm import relationship


class Allocation(BaseModel, Base):
    __tablename__ = 'allocations'
    assignmentID = Column(String(120),ForeignKey('assignments.id') , nullable=False,)
    userID = Column(String(120), ForeignKey('users.id') , nullable=False )
    assign_date = Column(Date, nullable=False,)
    assignment = relationship("Assignment", back_populates="allocation")
    students = relationship("User", back_populates="allocation")
   

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
   