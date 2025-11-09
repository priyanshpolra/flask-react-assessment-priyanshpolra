import axios from "axios";

const API_BASE = "http://127.0.0.1:5001";

// Get comments for a task
export const getComments = (taskId) =>
  axios.get(`${API_BASE}/tasks/${taskId}/comments`);

// Create comment
export const createComment = (taskId, data) =>
  axios.post(`${API_BASE}/tasks/${taskId}/comments`, data);

//  Update comment
export const updateComment = (commentId, data) =>
  axios.put(`${API_BASE}/comments/${commentId}`, data);

// Delete comment
export const deleteComment = (commentId) =>
  axios.delete(`${API_BASE}/comments/${commentId}`);
