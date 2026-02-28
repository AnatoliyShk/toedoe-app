import api from './api';

const apiPath = import.meta.env.VITE_API_PATH || '/api/v1';
const resource = `${apiPath}/tasks`;

export const allTasks = () => {
  return api.get(resource);
}

export const createTask = (task) => {
  return api.post(resource, task);
}

export const updateTask = (id, task) => {
  return api.put(`${resource}/${id}`, task);
}

export const removeTask = (id) => {
  return api.delete(`${resource}/${id}`);
}

export const completeTask = (id, task) => {
  return api.patch(`${resource}/${id}/complete`, task);
}