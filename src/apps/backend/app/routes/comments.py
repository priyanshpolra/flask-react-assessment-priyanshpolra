from flask import Blueprint, request, jsonify
from app.database import db
from app.models.comment import Comment
from app.models.task import Task

comments_bp = Blueprint("comments", __name__)


# Create Comment
@comments_bp.route("/tasks/<int:task_id>/comments", methods=["POST"])
def create_comment(task_id):
    data = request.get_json()

    if not data or "content" not in data:
        return {"error": "content is required"}, 400

    task = db.session.get(Task, task_id)
    if not task:
        return {"error": "Task not found"}, 404

    comment = Comment(task_id=task_id, content=data["content"])
    db.session.add(comment)
    db.session.commit()

    return jsonify(comment.to_dict()), 201


# List Comments
@comments_bp.route("/tasks/<int:task_id>/comments", methods=["GET"])
def get_comments(task_id):
    task = db.session.get(Task, task_id)
    if not task:
        return {"error": "Task not found"}, 404

    comments = Comment.query.filter_by(task_id=task_id).all()
    return jsonify([c.to_dict() for c in comments]), 200


# Update Comment
@comments_bp.route("/comments/<int:comment_id>", methods=["PATCH", "PUT"])
def update_comment(comment_id):
    comment = db.session.get(Comment, comment_id)
    if not comment:
        return {"error": "Comment not found"}, 404

    data = request.get_json()
    if not data or "content" not in data:
        return {"error": "content is required"}, 400

    comment.content = data["content"]
    db.session.commit()

    return jsonify(comment.to_dict()), 200


# Delete Comment
@comments_bp.route("/comments/<int:comment_id>", methods=["DELETE"])
def delete_comment(comment_id):
    comment = db.session.get(Comment, comment_id)
    if not comment:
        return {"error": "Comment not found"}, 404

    db.session.delete(comment)
    db.session.commit()

    return {"message": "Comment deleted"}, 200
