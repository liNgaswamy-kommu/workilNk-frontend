import api from "./api";

export const applyForTask = (taskId, data) => {
  return api.post(`/api/applications/tasks/${taskId}/apply`, data);
};
