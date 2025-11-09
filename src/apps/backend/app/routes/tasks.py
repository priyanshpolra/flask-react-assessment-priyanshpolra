from flask import Blueprint, request, jsonify
from app.database import db
from app.models.task import Task

tasks_bp = Blueprint("tasks", __name__, url_prefix="/tasks")

#  Get all tasks
@tasks_bp.route("", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([t.to_dict() for t in tasks]), 200

# Create task
@tasks_bp.route("", methods=["POST"])
def create_task():
    data = request.get_json()

    if not data or "title" not in data:
        return {"error": "title is required"}, 400

    task = Task(
        title=data["title"],
        description=data.get("description", "")
    )
    db.session.add(task)
    db.session.commit()

    return task.to_dict(), 201

# Update task
@tasks_bp.route("/<int:task_id>", methods=["PUT", "PATCH"])
def update_task(task_id):
    task = db.session.get(Task, task_id)
    if not task:
        return {"error": "Task not found"}, 404

    data = request.get_json()
    if not data:
        return {"error": "No data provided"}, 400

    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)

    db.session.commit()
    return task.to_dict(), 200

# Delete task
@tasks_bp.route("/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = db.session.get(Task, task_id)
    if not task:
        return {"error": "Task not found"}, 404

    db.session.delete(task)
    db.session.commit()

    return {"message": "Task deleted"}, 200
