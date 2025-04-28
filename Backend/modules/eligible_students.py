from models import storage
from models.user import User
from models.university import University
from models.enrollment import Enrollment



def get_eligible_students(user_id,course_id):
    session = storage._DBStorage__session
    user = session.query(User).filter_by(id=user_id,).first()
    user_info = session.query(User).join(University).filter(
        University.university == user.university.university
    ).all()
    all_students = []
    for i in user_info:
        # print(i.university.university, i.university.College, i.university.department, i.university.level)
        all_students.append(i.id)
    eligible_students = []

    for i in all_students:
        enroll_user = storage.get_enroll_id(Enrollment,i,course_id )
        if enroll_user:
            eligible_students.append(i)
  
    return eligible_students