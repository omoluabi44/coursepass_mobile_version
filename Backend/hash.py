#!/usr/bin/env python3


import bcrypt


password = b"Mr_engineer44"

hashed = bcrypt.hashpw(password, bcrypt.gensalt(10))

if bcrypt.checkpw(password, hashed):
    print("it match")
else:
    print("it does not match")