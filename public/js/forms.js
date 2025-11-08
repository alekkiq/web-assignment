import {createUser, checkUsernameAvailable, loginUser} from './api/auth.js';

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginModal = document.getElementById('login-dialog');

export const initForms = () => {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const result = await loginUser(username, password);

    if (result !== null) {
      alert(result.message);
      e.target.reset();
      location.reload();
    }
  });

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPw = document.getElementById('reg-password-confirm').value;

    if (password !== confirmPw) {
      alert("Passwords do not match, please try again");
      return;
    }

    const usernameAvailable = await checkUsernameAvailable();
    if (!usernameAvailable) {
      alert("Username already exists, please try another one");
      return;
    }

    const result = await createUser(username, email, password);
    console.log(result);
    alert("User created successfully, you can now login");
    loginModal.close();
    e.target.reset();
  });
}