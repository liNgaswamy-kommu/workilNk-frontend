import { apiRequest } from "./api";

export const applyForTask = (taskId, data) => {
  return apiRequest(
    `/api/applications/tasks/${taskId}/apply`,
    "POST",
    data
  );
};

export const hasAppliedForTask = (taskId) => {
  return apiRequest(
    `/api/applications/tasks/${taskId}/applied`
  );
};

export const getApplicationsByTask = (taskId) => {
  return apiRequest(`/api/applications/task/${taskId}`);
};