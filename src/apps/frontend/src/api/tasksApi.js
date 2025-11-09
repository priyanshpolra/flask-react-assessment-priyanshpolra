import axios from "axios";

const API_BASE = "http://127.0.0.1:5001";

//  Get all tasks
export const getTasks = () => axios.get(`${API_BASE}/tasks`);

//  Create a new task
export const createTask = (data) =>
  axios.post(`${API_BASE}/tasks`, data);

// Update a task
export const updateTask = (taskId, data) =>
  axios.put(`${API_BASE}/tasks/${taskId}`, data);

// Delete a task
export const deleteTask = (taskId) =>
  axios.delete(`${API_BASE}/tasks/${taskId}`);
