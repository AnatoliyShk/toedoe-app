import api from "./api";

export const csrfCookie = () => {
  return api.get('/sanctum/csrf-cookie');
}

export const login = (credentials) => {
  return api.post('auth/login', credentials);
}

export const register = (user) => {
  return api.post('auth/register', user);
}

export const logout = () => {
  return api.post('auth/logout');
}

export const getUser = () => {
  return api.get('api/user');
}