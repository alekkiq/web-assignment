import { BASE_URL } from './config.js';
import { fetchData } from './fetchData.js';

export const checkUsernameAvailable = async (username) => {
  const url = `${BASE_URL}/users/available/${username}`;
  const data = await fetchData(url);
  return data.available || false;
}

export const createUser = async (username, email, password) => {
  const url = `${BASE_URL}/users`;

  return await fetchData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email
    }),
  });
}

export const loginUser = async (username, password) => {
  const url = `${BASE_URL}/auth/login`;

  const response = await fetchData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
  });

  if (response.token) {
    localStorage.setItem('auth-token', response.token);
  }

  return response;
}

export const logoutUser = () => {
  localStorage.removeItem('auth-token');
  location.reload();
}

export const getUserByToken = async (token) => {
  const url = `${BASE_URL}/users/token`;

  const data = await fetchData(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (data) {
    sessionStorage.setItem('user-info', JSON.stringify({username: data.username || '', avatar: data.avatar || ''}));
  }

  return data;
}

export const isUserLoggedIn = async () => {
  const token = localStorage.getItem('auth-token');

  if (!token) return false;

  const user = await getUserByToken(token);
  //console.log(user);
  return !!user;
}

export const updateUser = async (token, data) => {
  const url = `${BASE_URL}/users`;

  // TODO
}