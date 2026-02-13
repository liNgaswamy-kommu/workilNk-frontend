import { apiRequest } from "./api";

/* ================= TASK APIs ================= */

// Create / Post Task
export function createTask(taskData) {
  return apiRequest("/api/tasks", "POST", taskData);
}

// ✅ UPDATE TASK (NEW)
export function updateTask(taskId, taskData) {
  return apiRequest(`/api/tasks/${taskId}`, "PUT", taskData);
}

// ✅ DELETE TASK (NEW)
export function deleteTask(taskId) {
  return apiRequest(`/api/tasks/${taskId}`, "DELETE");
}

// Get all available tasks
export function getAllTasks() {
  return apiRequest("/api/tasks");
}

// Get tasks posted by logged-in user
export function getMyPostedTasks() {
  return apiRequest("/api/tasks/me/tasks");
}

// Start task (worker)
export function startTask(taskId) {
  return apiRequest(`/api/tasks/${taskId}/start`, "POST");
}

// Complete task (worker)
export function completeTask(taskId) {
  return apiRequest(`/api/tasks/${taskId}/complete`, "POST");
}

// Confirm task (owner)
export function confirmTask(taskId) {
  return apiRequest(`/api/tasks/${taskId}/confirm`, "POST");
}

// Open tasks (other users)
export const getOpenTasks = () => {
  return apiRequest("/api/tasks/open");
};
