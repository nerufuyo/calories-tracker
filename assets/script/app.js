/* eslint-disable max-len */
import {getFirestore, collection, updateDoc, getDoc, addDoc, setDoc, doc} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import {auth, database, signUpNewUser,
  loginUser,
  logOutUser,
  updateProfile,
  switchFromLoginForm,
  switchFromSignUpForm,
  hamburgerMenu,
  preloader,
  removeProfileAttributDisabled,
  setProfileAttributeDisable,
  selectPhotoProfile,
  uploadPhotoProfile,
  getCookie,
  checkCookie,
  addFoodDiary,
  removeFoodAttributDisabled,
  setFoodAttributDisabled,
  removeEditFoodAttributDisabled,
  setEditFoodAttributDisabled} from './function.js';

// Preloader
document.documentElement.addEventListener('load', preloader) || null;

// Hamburger Menu
const hamburger = document.querySelector('nav ul.hamburger-lines') || null;
if (hamburger !== null) {
  hamburger.addEventListener('click', hamburgerMenu);
}

// Auth State Changed
if (auth !== null) {
  onAuthStateChanged(auth, async (user) => {
    const databaseFoodRef = doc(database, `foodDiaries`);
    const databaseRef = doc(database, `userProfile`, `${user.uid}`);
    const databaseRead = await getDoc(databaseRef);
    const databaseFoodRead = await getDoc(databaseFoodRef);

    // User Profile Variable
    const fullname = document.getElementById('profile-fullname-input'); 
    const email = document.getElementById('profile-email-input');
    const birth = document.getElementById('profile-birth-input');
    const gender = document.getElementById('profile-gender-input');
    const height = document.getElementById('profile-height-input');
    const weight = document.getElementById('profile-weight-input');

    // Food Diary Variable
    const foodId = document.getElementById('food-id-edit-input');
    const foodName = document.getElementById('food-name-edit-input');
    const foodSize = document.getElementById('food-size-edit-input');
    const foodCategory = document.getElementById('food-category-edit-input');
    const foodCalories = document.getElementById('food-calories-edit-input');
    const foodDate = document.getElementById('food-date-edit-input');

    // User Profile Read
    if (databaseRead.exists()) {
      if (fullname, email, birth, gender, height, weight !== null) {
        fullname.value = databaseRead.data().fullname;
        email.value = databaseRead.data().email;
        birth.value = databaseRead.data().birth;
        gender.value = databaseRead.data().gender;
        height.value = databaseRead.data().height;
        weight.value = databaseRead.data().weight;
      }
    };

    // Food Diary Read
    if (databaseFoodRef.exists()) {
      if (foodId, foodName, foodCategory, foodCalories, foodSize, foodDate !== null) {
        foodId.value = databaseFoodRead.data();
      }
    };
  });
}

const dontHaveAccountButton = document.getElementById('dont-have-account') || null;
if (dontHaveAccountButton !== null) {
  dontHaveAccountButton.addEventListener('click', switchFromLoginForm);
}

const haveAccountButton = document.getElementById('have-account') || null;
if (haveAccountButton !== null) {
  haveAccountButton.addEventListener('click', switchFromSignUpForm);
}

const signUpButton = document.getElementById('signup') || null;
if (signUpButton !== null) {
  signUpButton.addEventListener('click', signUpNewUser);
}

const loginButton = document.getElementById('login') || null;
if (loginButton !== null) {
  loginButton.addEventListener('click', loginUser);
}

const logoutButton = document.getElementById('logout') || null;
if (logoutButton !== null) {
  logoutButton.addEventListener('click', logOutUser);
}

// Cookie Page Load
const foodDiaryPage = document.getElementById('food-diary') || null;
if (foodDiaryPage !== null) {
  if (getCookie('user') === '') {
    window.location.href = 'authentication.html';
  }
}

const userProfilePage = document.getElementById('user-profile') || null;
if (userProfilePage !== null) {
  if (getCookie('user') === '') {
    window.location.href = 'authentication.html';
  }
}

// User Profile Page
const saveButton = document.getElementById('profile-save-button') || null;
if (saveButton !== null) {
  saveButton.addEventListener('click', updateProfile);
}

const editProfileButton = document.getElementById('profile-edit-button') || null;
if (editProfileButton !== null) {
  editProfileButton.addEventListener('click', removeProfileAttributDisabled);
}

const cancelProfileButton = document.getElementById('profile-cancel-button') || null;
if (cancelProfileButton !== null) {
  cancelProfileButton.addEventListener('click', setProfileAttributeDisable);
}

const selectProfileImageButton = document.getElementById('image-select') || null;
if (selectProfileImageButton !== null) {
  selectProfileImageButton.addEventListener('change', selectPhotoProfile);
}

const uploadProfileImageButton = document.getElementById('image-upload') || null;
if (uploadProfileImageButton !== null) {
  uploadProfileImageButton.addEventListener('click', uploadPhotoProfile);
}

// Food Diary Page
const saveFoodDiaryButton = document.getElementById('save-food-button') || null;
if (saveFoodDiaryButton !== null) {
  saveFoodDiaryButton.addEventListener('click', addFoodDiary);
}

const addFoodDiaryButton = document.getElementById('add-food-button') || null;
if (addFoodDiaryButton !== null) {
  addFoodDiaryButton.addEventListener('click', removeFoodAttributDisabled);
}

const cancelFoodDiaryButton = document.getElementById('cancel-food-button') || null;
if (cancelFoodDiaryButton !== null) {
  cancelFoodDiaryButton.addEventListener('click', setFoodAttributDisabled);
}

const editFoodDiaryButton = document.getElementById('edit-food-button') || null;
if (editFoodDiaryButton !== null) {
  editFoodDiaryButton.addEventListener('click', removeEditFoodAttributDisabled);
}

const cancelEditFoodDiaryButton = document.getElementById('cancel-food-edit-button') || null;
if (cancelEditFoodDiaryButton !== null) {
  cancelEditFoodDiaryButton.addEventListener('click', setEditFoodAttributDisabled);
}
