import { api } from './client';

export async function login(username, password) {
  const { data } = await api.post('/auth/jwt/create/', { username, password });
  localStorage.setItem('access', data.access);
  localStorage.setItem('refresh', data.refresh);
  return data;
}

export async function register({ username, email, password, re_password }) {
  const { data } = await api.post('/auth/users/', {
    username,
    email,
    password,
    re_password,
  });
  return data;
}

// Активация по почте отключена на бэкенде (SEND_ACTIVATION_EMAIL = False)
// export async function activateAccount(uid, token) {
//   await api.post('/auth/users/activation/', { uid, token });
// }

export async function fetchCurrentUser() {
  const { data } = await api.get('/auth/users/me/');
  return data;
}

export function logoutLocal() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
}
