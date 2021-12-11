/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import {connectToDatabase} from './database-connector.js';
import {getDatabase, set, ref, update, onValue} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

// Initialize Firebase
export const app = connectToDatabase();
export const database = getDatabase(app);
export const auth = getAuth();

// Authentication
export function signUpNewUser() {
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  if (fullname.value === '' || email.value === '' || password.value === '') {
    alert('Please fill all fields!');
  } else {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;

          set(ref(database, `users/${user.uid}`), {
            fullname: fullname.value,
            email: email.value,
          });
          alert('User Created!');
        })

        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
  }
}

export function loginUser() {
  const email = document.getElementById('emails');
  const password = document.getElementById('passwords');

  if (email.value === '' || password.value === '') {
    alert('Please fill all fields!');
  } else {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          const date = new Date();

          update(ref(database, `users/${user.uid}`), {
            last_login: date,
          });
          alert('User Logged in!');
          window.location.href = 'user-profile.html';
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
  }
}

export function logOutUser() {
  signOut(auth).then(() => {
    alert('Logout Succesfully!');
    window.location.href = 'authentication.html';
  }).catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);
  });
}

export function switchFromLoginForm() {
  const loginForm = document.querySelector('section.login-page div.form-collection div.login-form');
  const registerForm = document.querySelector('section.login-page div.form-collection div.signup-form');

  loginForm.style.display = 'none';
  registerForm.style.display = 'flex';
}

export function switchFromSignUpForm() {
  const loginForm = document.querySelector('section.login-page div.form-collection div.login-form');
  const registerForm = document.querySelector('section.login-page div.form-collection div.signup-form');

  loginForm.style.display = 'flex';
  registerForm.style.display = 'none';
}

// Profile CRUD
export function updateProfile() {
  onAuthStateChanged(auth, (user) => {
    const fullname = document.getElementById('profile-fullname-input');
    const email = document.getElementById('profile-email-input');
    const birth = document.getElementById('profile-birth-input');
    const gender = document.getElementById('profile-gender-input');
    const height = document.getElementById('profile-height-input');
    const weight = document.getElementById('profile-weight-input');
    const databaseRef = ref(database, `users/${user.uid}`);

    update(ref(database, `users/${user.uid}`), {
      fullname: fullname.value,
      email: email.value,
      birth: birth.value,
      gender: gender.value,
      height: height.value,
      weight: weight.value,
    });
    alert('Data Upadated!');
  });
}

// Style
export function hamburgerMenu() {
  const hamburgerItem = document.querySelector('nav ul.navigation-list');

  if (hamburgerItem.style.left === '100%') {
    hamburgerItem.style.left = '0%';
    document.body.classList.add('stop_scrolling');
  } else {
    hamburgerItem.style.left = '100%';
    document.body.classList.remove('stop_scrolling');
  }
}

export async function preloader() {
  const preloader = document.getElementById('preloader');

  document.body.classList.add('stop_scrolling');
  await sleep(4500);
  preloader.style.display = 'none';
  document.body.classList.remove('stop_scrolling');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function removeAttributDisabled() {
  const inputFullName = document.getElementById('profile-fullname-input');
  const inputEmail = document.getElementById('profile-email-input');
  const inputBirth = document.getElementById('profile-birth-input');
  const inputGender = document.getElementById('profile-gender-input');
  const inputHeight = document.getElementById('profile-height-input');
  const inputWeight = document.getElementById('profile-weight-input');
  const buttonGroup =document.querySelector('div.profile-button-group');
  const editButton = document.getElementById('profile-edit-button');

  inputFullName.disabled = false;
  inputEmail.disabled = false;
  inputBirth.disabled = false;
  inputGender.disabled = false;
  inputHeight.disabled = false;
  inputWeight.disabled = false;
  buttonGroup.style.display = 'flex';
  editButton.style.display = 'none';
}

export function setAttributeDisable() {
  const inputFullName = document.getElementById('profile-fullname-input');
  const inputEmail = document.getElementById('profile-email-input');
  const inputBirth = document.getElementById('profile-birth-input');
  const inputGender = document.getElementById('profile-gender-input');
  const inputHeight = document.getElementById('profile-height-input');
  const inputWeight = document.getElementById('profile-weight-input');
  const buttonGroup =document.querySelector('div.profile-button-group');
  const editButton = document.getElementById('profile-edit-button');

  inputFullName.disabled = true;
  inputEmail.disabled = true;
  inputBirth.disabled = true;
  inputGender.disabled = true;
  inputHeight.disabled = true;
  inputWeight.disabled = true;
  buttonGroup.style.display = 'none';
  editButton.style.display = 'flex';
}
