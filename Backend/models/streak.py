#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Integer, Date
from sqlalchemy.orm import relationship
from models.user import User


class Streak(BaseModel, Base):
    __tablename__ = 'streak'
    userID = Column(String(120), ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    point = Column(Integer, nullable=False)
    streak_day = Column(Integer, nullable=False)
    streak_start_date = Column(Date, nullable=False)
    last_active_date = Column(Date, nullable=False)
    
    user = relationship("User", back_populates="streak")




    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
