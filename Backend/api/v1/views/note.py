from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from models import storage
from models.outline import Outline
from models.note import Note
import os
from os.path import join, dirname
from flask_jwt_extended import  jwt_required
from flasgger.utils import swag_from

session = storage._DBStorage__session


@app_views.route('/outline/<outline_id>/notes', methods=['GET'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/note/all_note.yml'))
@jwt_required()
def get_outline_notes(outline_id):
    """
    Retrieves the list of all note for a specific outline.
    """
    outline = storage.get_id(Outline, outline_id)
    if not outline:
        abort(404)
    outline_dict = [note.to_dict() for note in outline.note if note.outlineID == outline_id]
    return jsonify(outline_dict)

@app_views.route('/note/<outline_id>/<session_id>', methods=['GET'], strict_slashes=False)
# @swag_from(join(dirname(__file__), 'documentation/note/all_note.yml'))
@jwt_required()
def get__note_session(session_id,outline_id):
    """
   get note by the session
    """
    note = session.query(Note).filter_by(session=session_id, outlineID=outline_id).first()
    if not note:
        abort(404)
    return jsonify(note.to_dict())



@app_views.route('/note/<note_id>', methods=['GET'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/note/get_note.yml'))
@jwt_required()
def get_note(note_id):
    """
    
    Retrieves a specific notes by its ID.
    """
    note = storage.get_id(Note, note_id)
    if not note:
        abort(404)
    return jsonify(note.to_dict())


@app_views.route('/note', methods=['POST'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/note/post_note.yml'))
# @jwt_required()
def post_note():
    """
    Creates new note for a specific outline.
    """

    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    note_attributes = ['content', 'outlineID', 'orderID','session']
    for i in note_attributes:
        if i not in data:
            abort(400, description=f"missing - {i}")

    
    note = Note(**data)  
    note.save()
  
    return make_response(jsonify(note.to_dict()), 201)



# Update content
@app_views.route('/note/<note_id>', methods=['PUT'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/note/update_note.yml'))
@jwt_required()
def put_note(note_id):
    """
    Updates existing Content.
    """
    note = storage.get_id(Note, note_id)
    if not note:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    ignore = ['id', 'course_id', 'created_at', 'updated_at']
    for key, value in data.items():
        if key not in ignore:
            setattr(note, key, value)
    note.save()
    return make_response(jsonify(note.to_dict()), 200)


# Delete content
@app_views.route('/note/<note_id>', methods=['DELETE'], strict_slashes=False)
@swag_from(join(dirname(__file__), 'documentation/note/del_note.yml'))
# @jwt_required()
def delete_note(note_id):
    """
    Deletes Content by its ID.
    """
    note = storage.get_id(Note, note_id)
    if not note:
        abort(404)
    storage.delete(note)
    storage.save()
    return make_response(jsonify({}), 200)
