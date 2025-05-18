#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, JSON, Integer
from sqlalchemy.orm import relationship


class Score(BaseModel, Base):
    __tablename__ = 'scores'
    enrollmentID = Column(String(120), ForeignKey('enrollments.id', ondelete='CASCADE') , nullable=False )
    score = Column(Integer, nullable=False,)
    enrollment = relationship("Enrollment", back_populates="scores")
   

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
   