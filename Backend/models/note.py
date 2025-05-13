#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey,Integer
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import LONGTEXT


class Note(BaseModel, Base):
    __tablename__ = 'notes'
  
    outlineID = Column(String(60), ForeignKey('outline.id'), nullable=False)
    content = Column(LONGTEXT, nullable=False)
    session = Column(String(60), nullable=False,)
    orderID = Column(Integer, nullable=False, )
    outlines = relationship("Outline", back_populates="note")
   


    def __init__(self,*args, **kwargs):
        super().__init__(*args, **kwargs)
 