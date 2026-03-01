import api from "./api";

export const csrfCookie = () => {
  return api.get('/sanctum/csrf-cookie');
}

export const login = (credentials) => {
  return api.post('/login', credentials);
}

export const register = (user) => {
  return api.post('/register', user);
}

export const logout = () => {
  return api.post('/logout');
}

export const getUser = () => {
  return api.get('/user');
}