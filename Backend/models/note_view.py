#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from models.user import User


class NoteView(BaseModel, Base):
    __tablename__ = 'note_view'
    # noteID = Column(String(120), ForeignKey('notes.id', ondelete="CASCADE"), nullable=False)
    userID = Column(String(120), ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    note_id = Column(String(120), nullable=False,)
    date_viewed = Column(Date, nullable=False)
    
 

    # note = relationship("Note", back_populates="note_view")
    user = relationship("User", back_populates="note_view")




    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
