/*eslint-disable */
import '@babel/polyfill';

import { login, logout, signup } from './login';
import { updateSettings, sendEmail, resetPassword } from './updateSettings';
import { renderBarcode } from './barcode';
import { addNewCard, editCard } from './card';

// DOM ELEMENTS
const modifyAccount = document.getElementById('modify-account');
const barcode = document.getElementById('barcode');
const loginBtn = document.querySelector('.login-btn-log');
const logOutBtn = document.getElementById('logoutbtn');
const saveNewPassword = document.getElementById('save-new-password');
const signUpButton = document.getElementById('sign-up-button');
const editCardBtn = document.getElementById('btn-edit-card');
const resetBtn = document.getElementById('reset-btn');
const resetPasswordBtn = document.getElementById('reset-password-btn');

const addNewCardBtn = document.getElementById('btn-add-new-card');

// VALUES

// DELEGATION
if (barcode) {
  const number = barcode.dataset.barcode * 1;

  renderBarcode(number);
}

if (loginBtn) {
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signUpButton) {
  signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    signup(email, name, password, passwordConfirm);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (modifyAccount) {
  modifyAccount.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    updateSettings({ name, email }, 'DATA');
  });
}

if (saveNewPassword) {
  saveNewPassword.addEventListener('click', async (e) => {
    e.preventDefault();
    saveNewPassword.textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    saveNewPassword.textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (addNewCardBtn) {
  addNewCardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const code = document.getElementById('card-number').value;

    addNewCard(name, code);
  });
}

if (editCardBtn) {
  editCardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const code = document.getElementById('card-number').value;
    const id = document.getElementById('card-number').dataset.barcode;

    editCard(name, code, id);
  });
}

if (resetBtn) {
  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    sendEmail(email);
  });
}

if (resetPasswordBtn) {
  resetPasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    const token = document.getElementById('password-confirm').dataset.token;
    resetPassword(password, passwordConfirm, token);
  });
}
