/**
 * Functionality for the 2 dialogs on the page
 */

const openLoginBtn = document.getElementById('open-login');
const loginDialog = document.getElementById('login-dialog');

const updateProfBtn = document.getElementById('open-profile-update');
const updateProfDialog = document.getElementById('update-profile');

const initAuthTabs = () => {
  const loginTab = document.getElementById('tab-login');
  const loginPanel = document.getElementById('login-panel');
  const registerTab = document.getElementById('tab-register');
  const registerPanel = document.getElementById('register-panel');

  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    loginPanel.classList.add('active');
    registerTab.classList.remove('active');
    registerPanel.classList.remove('active');
  });

  registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    registerPanel.classList.add('active');
    loginTab.classList.remove('active');
    loginPanel.classList.remove('active');
  });
}

export const initLoginDialog = () => {
  initAuthTabs();

  openLoginBtn.addEventListener('click', () => {
    loginDialog.showModal();
  });
}

export const initUpdateProfileDialog = () => {
  updateProfBtn.addEventListener('click', () => {
    updateProfDialog.showModal();
  });
}