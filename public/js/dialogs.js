/**
 * Functionality for the 2 dialogs on the page
 */

const openLoginBtn = document.getElementById('open-login');
const closeLoginBtn = document.getElementById('close-login');
const loginDialog = document.getElementById('login-dialog');

const updateProfBtn = document.getElementById('open-profile-update');
const closeUpdateBtn = document.getElementById('close-update');
const updateProfDialog = document.getElementById('update-profile');


/**
 * Initializes all `<dialog>` elements with the class `modal`.
 *
 * In order to work properly:
 * - each dialog should have a `<button>` with
 * the class `close-modal` as a child.
 * - each dialog should have a unique id.
 * - the document should contain a button with `data-open-dialog="<dialog-id>"`
 */
export const initDialogs = () => {
  const dialogs = document.querySelectorAll('dialog.modal');

  dialogs.forEach((d) => {
    const openBtn = document.querySelector(`button[data-open-dialog="${d.id}"]`);
    const closeBtn = d.querySelector('button.close-modal');

    openBtn.addEventListener('click', (e) => {
      e.preventDefault();

      d.showModal();
    });

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();

      d.close();
    });
  });
}



export const initTabs = () => {
  const tabsElements = document.querySelectorAll('.tabs');

  tabsElements.forEach((tabs) => {
    const controls = tabs.querySelectorAll('button.tab');
    const panels = tabs.querySelectorAll('.panel');

    controls.forEach((ctrl, i) => {
      const correspondingPanel = panels[i];

      ctrl.addEventListener('click', (e) => {
        e.preventDefault();

        ctrl.classList.add('active');
        correspondingPanel.classList.add('active');
      });
    });
  });
}








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
