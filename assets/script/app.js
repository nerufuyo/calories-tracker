/* eslint-disable max-len */
import {connectToDatabase} from './database-connector.js';
import {getDatabase, set, ref, update, onValue} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import { auth, database, signUpNewUser, 
  loginUser,    
  logOutUser,
  updateProfile,
  switchFromLoginForm, 
  switchFromSignUpForm,
  hamburgerMenu,
  preloader,
  removeAttributDisabled,
  setAttributeDisable } from './function.js';

// Preloader
document.documentElement.addEventListener('load', preloader) || null;

// Hamburger Menu
const hamburger = document.querySelector('nav ul.hamburger-lines') || null;
if (hamburger !== null) {
  hamburger.addEventListener('click', hamburgerMenu)
}

// Auth Page
onAuthStateChanged(auth, (user) => {
  const fullname = document.getElementById('profile-fullname-input');
  const email = document.getElementById('profile-email-input');
  const birth = document.getElementById('profile-birth-input');
  const gender = document.getElementById('profile-gender-input');
  const height = document.getElementById('profile-height-input');
  const weight = document.getElementById('profile-weight-input');
  const databaseRef = ref(database, `users/${user.uid}`);

  onValue(databaseRef, (data) => {  
    const obj = data.val();
    fullname.value = obj['fullname'];
    email.value = obj['email'];
    birth.value = obj['birth'];
    gender.value = obj['gender'];
    height.value = obj['height'];
    weight.value = obj['weight'];
  });
});

const dontHaveAccountButton = document.getElementById('dont-have-account') || null;
if (dontHaveAccountButton !== null) {
  dontHaveAccountButton.addEventListener('click', switchFromLoginForm)
}

const haveAccountButton = document.getElementById('have-account') || null;
if (haveAccountButton !== null) {
  haveAccountButton.addEventListener('click', switchFromSignUpForm)
}

const signUpButton = document.getElementById('signup') || null;
if (signUpButton !== null) {
  signUpButton.addEventListener('click', signUpNewUser)
}

const loginButton = document.getElementById('login') || null;
if (loginButton !== null) {
  loginButton.addEventListener('click', loginUser)
}

const logoutButton = document.getElementById('logout') || null;
if (logoutButton !== null) {
  logoutButton.addEventListener('click', logOutUser)
}

// User Profile Page
const saveButton = document.getElementById('profile-save-button') || null;
if (saveButton !== null) {
  saveButton.addEventListener('click', updateProfile)
}

const editProfileButton = document.getElementById('profile-edit-button') || null;
if (editProfileButton !== null) {
  editProfileButton.addEventListener('click', removeAttributDisabled)
}

const cancelProfileButton = document.getElementById('profile-cancel-button') || null;
if (cancelProfileButton !== null) {
  cancelProfileButton.addEventListener('click', setAttributeDisable)
}