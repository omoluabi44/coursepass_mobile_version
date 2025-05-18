#!/usr/bin/python3
"""
Contains the class DBStorage
"""

import models

from models.base_model import BaseModel, Base
from models.user import User
from models.university import University
from models.outline import Outline
from models.course import Courses
from models.note import Note
from models.quize import Quize
from models.enrollment import Enrollment
from models.score import Score
from models.universities import Universities
from models.college import College
from models.assignment import Assignment
from models.allocation import Allocation
from models.flashcard import  Flashcard
from models.department import Department
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker


classes = {
            "Note":Note, "User": User,"University":University,"Courses": Courses,
             "Outline": Outline, "Quize":Quize, "Enrollment"
            :Enrollment, "Score":Score, "Assignment":Assignment, "Allocation":Allocation,
            "Flashcard":Flashcard, "Universities":Universities, "College":College, "Department":Department
    }


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        HBNB_MYSQL_USER = getenv('BDYM_MYSQL_USER')
        HBNB_MYSQL_PWD = getenv('BDYM_MYSQL_PWD')
        HBNB_MYSQL_HOST = getenv('BDYM_MYSQL_HOST')
        HBNB_MYSQL_DB = getenv('BDYM_MYSQL_DB')
        HBNB_ENV = getenv('BDYM_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(HBNB_MYSQL_USER,
                                             HBNB_MYSQL_PWD,
                                             HBNB_MYSQL_HOST,
                                             HBNB_MYSQL_DB))
        if HBNB_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """
        Returns the object based on the class name and its CourseID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        return self.__session.query(cls).filter_by(courseID=id).first()
    def get_username(self, cls, username):
        """
        Returns the object based on the class name and its username, or
        None if not found
        """
        if cls not in classes.values():
            return None
        """this way more faster than using the one above and below, gonna change it soon"""
        return self.__session.query(cls).filter_by(username=username).first()
    def get_id(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        return self.__session.query(cls).filter_by(id=id).first()

        return None
    def get_enroll_id(self, cls, id, course_id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        return self.__session.query(cls).filter_by(userID=id).first()

        return None

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())

        return count
