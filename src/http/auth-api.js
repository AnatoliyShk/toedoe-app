import api from "./api";

export const login = (credentials) => {
  return api.post('/api/auth/login', credentials);
}

export const register = (user) => {
  return api.post('/api/auth/register', user);
}

export const logout = () => {
  return api.post('/api/auth/logout');
}

export const getUser = () => {
  return api.get('api/user');
}