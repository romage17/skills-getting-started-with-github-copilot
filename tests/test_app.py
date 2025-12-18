import pytest
from fastapi.testclient import TestClient
from src.app import app

client = TestClient(app)

def test_get_activities():
    response = client.get("/activities")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, dict)
    assert "Chess Club" in data

def test_signup_and_unregister():
    # Use a unique email for testing
    test_email = "pytestuser@mergington.edu"
    activity = "Chess Club"

    # Ensure not already registered
    client.post(f"/activities/{activity}/unregister", params={"email": test_email})

    # Sign up
    response = client.post(f"/activities/{activity}/signup", params={"email": test_email})
    assert response.status_code == 200
    assert f"Signed up {test_email}" in response.json()["message"]

    # Try duplicate signup
    response_dup = client.post(f"/activities/{activity}/signup", params={"email": test_email})
    assert response_dup.status_code == 400

    # Unregister
    response_unreg = client.post(f"/activities/{activity}/unregister", params={"email": test_email})
    assert response_unreg.status_code == 200
    assert f"Unregistered {test_email}" in response_unreg.json()["message"]

    # Try duplicate unregister
    response_unreg2 = client.post(f"/activities/{activity}/unregister", params={"email": test_email})
    assert response_unreg2.status_code == 400
