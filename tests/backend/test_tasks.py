import json
from src.apps.backend.app import create_app   # update path if needed

def test_get_tasks():
    app = create_app()
    client = app.test_client()
    response = client.get("/tasks")
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_create_task():
    app = create_app()
    client = app.test_client()
    payload = {"title": "Test Task"}
    response = client.post("/tasks", json=payload)
    assert response.status_code in (200, 201)
    assert response.json["title"] == "Test Task"
