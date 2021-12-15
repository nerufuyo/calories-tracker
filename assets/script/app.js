/* eslint-disable max-len */
import {ref, onValue} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';
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
  updateFoodDiary,
  removeFoodAttributDisabled,
  setFoodAttributDisabled} from './function.js';

// Preloader
document.documentElement.addEventListener('load', preloader) || null;

// Hamburger Menu
const hamburger = document.querySelector('nav ul.hamburger-lines') || null;
if (hamburger !== null) {
  hamburger.addEventListener('click', hamburgerMenu);
}

// Auth Page
if (auth !== null) {
  onAuthStateChanged(auth, (user) => {
    const databaseRef = ref(database, `users/${user.uid}/profile/`);
    // const databaseFoodRef = ref(database, `users/${user.uid}/food_diary/${newDate}/${newTime}/`);
    // User Profile Variable
    const fullname = document.getElementById('profile-fullname-input');
    const email = document.getElementById('profile-email-input');
    const birth = document.getElementById('profile-birth-input');
    const gender = document.getElementById('profile-gender-input');
    const height = document.getElementById('profile-height-input');
    const weight = document.getElementById('profile-weight-input');
    const image = document.getElementById('image-preview');
    // Food Diary Variable
    // const foodName = document.getElementById('food-name-input');
    // const foodSize = document.getElementById('food-size-input');
    // const foodCategory = document.getElementById('food-category-input');
    // const foodCalories = document.getElementById('food-calories-input');
    // const foodDate = document.getElementById('food-date-input');

    // User Profile Read
    onValue(databaseRef, (data) => {
      const obj = data.val();
      fullname.value = obj['fullname'];
      email.value = obj['email'];
      birth.value = obj['birth'];
      gender.value = obj['gender'];
      height.value = obj['height'];
      weight.value = obj['weight'];
      image.src = data.val().image_url;
    });

    // Food Diary Read
    // onValue(databaseFoodRef, (data) => {
    //   const obj = data.val();
    //   foodName.value = obj['food_name'];
    //   foodSize.value = obj['food_size'];
    //   foodCategory.value = obj['food_category'];
    //   foodCalories.value = obj['food_calories'];
    //   foodDate.value = obj['food_date'];
    // });
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
  saveFoodDiaryButton.addEventListener('click', updateFoodDiary);
}

const editFoodDiaryButton = document.getElementById('add-food-button') || null;
if (editFoodDiaryButton !== null) {
  editFoodDiaryButton.addEventListener('click', removeFoodAttributDisabled);
}

const cancelFoodDiaryButton = document.getElementById('cancel-food-button') || null;
if (cancelFoodDiaryButton !== null) {
  cancelFoodDiaryButton.addEventListener('click', setFoodAttributDisabled);
}
