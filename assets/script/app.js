/* eslint-disable max-len */
import {collection, getDoc, getDocs, query, where, doc} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
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
  getCookie,
  addFoodDiary,
  removeFoodAttributDisabled,
  setFoodAttributDisabled,
  removeEditFoodAttributDisabled,
  setEditFoodAttributDisabled,
  updateFoodDiary,
  deleteFoodDiary,
  changeEmailUser,
  changePasswordUser,
  passwordAttributeUnHide,
  passwordAttributeHide,
  passwordSignUpAttributeHide,
  passwordSignUpAttributeUnHide} from './function.js';

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
    // Landing Page
    const loginNavigationButton = document.getElementById('login-list');
    const dashboardNavigationButton = document.getElementById('dashboard-list');

    // Profile Database
    const databaseRef = doc(database, `userProfile`, `${user.uid}`);
    const databaseRead = await getDoc(databaseRef);

    // Email Profile
    const userEmail = auth.currentUser;
    const email = document.getElementById('new-email');

    // Food Database
    const databaseQuery = query(collection(database, `foodDiaries`), where('user_id', '==', user.uid));
    const databaseFoodRef = await getDocs(databaseQuery);

    // Landing Page Read
    loginNavigationButton.style.display = 'none';
    dashboardNavigationButton .style.display = 'flex';

    // User Profile Read
    if (databaseRead.exists()) {
      // User Profile Variable
      const fullname = document.getElementById('profile-fullname-input');
      const email = document.getElementById('profile-email-input');
      const birth = document.getElementById('profile-birth-input');
      const gender = document.getElementById('profile-gender-input');
      const height = document.getElementById('profile-height-input');
      const weight = document.getElementById('profile-weight-input');

      if (fullname, email, birth, gender, height, weight !== null) {
        fullname.value = databaseRead.data().fullname;
        email.value = databaseRead.data().email;
        birth.value = databaseRead.data().birth;
        gender.value = databaseRead.data().gender;
        height.value = databaseRead.data().height;
        weight.value = databaseRead.data().weight;
      }
    };

    // Email Read
    if (userEmail !== null) {
      userEmail.providerData.forEach((profile) => {
        email.value = profile.email;
      });
    }

    // Food Diary Read
    if (databaseFoodRef !== null) {
      // Food Diary Variable
      const foodId = document.getElementById('food-id-edit-input');
      const foodName = document.getElementById('food-name-edit-input');
      const foodSize = document.getElementById('food-size-edit-input');
      const foodCategory = document.getElementById('food-category-edit-input');
      const foodCalories = document.getElementById('food-calories-edit-input');
      const foodDate = document.getElementById('food-date-edit-input');

      databaseFoodRef.forEach((doc) => {
        const optionItem = document.createElement('option');
        optionItem.setAttribute('id', 'food-id-edit-option');
        optionItem.value = doc.id;
        optionItem.innerText = doc.id;
        foodId.appendChild(optionItem);
      });

      if (foodId !== null) {
        foodId.addEventListener('change', async (e)=> {
          const databaseFoodRef = doc(database, `foodDiaries`, foodId.value);
          const databaseFoodRead = await getDoc(databaseFoodRef);

          if (databaseFoodRead.exists()) {
            foodName.value = databaseFoodRead.data().food_name;
            foodSize.value = databaseFoodRead.data().food_size;
            foodCategory.value = databaseFoodRead.data().food_category;
            foodCalories.value = databaseFoodRead.data().food_calories;
            foodDate.value = databaseFoodRead.data().food_date;
          }
        });
      }
    }
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

const eyeButton = document.getElementById('eye') || null;
if (eyeButton !== null) {
  eyeButton.addEventListener('click', passwordAttributeHide);
}

const eyeSlashButton = document.getElementById('eye-slash') || null;
if (eyeSlashButton !== null) {
  eyeSlashButton.addEventListener('click', passwordAttributeUnHide);
}

const eyeSignUpButton = document.getElementById('eyes') || null;
if (eyeSignUpButton !== null) {
  eyeSignUpButton.addEventListener('click', passwordSignUpAttributeHide);
}

const eyeSlashSignUpButton = document.getElementById('eyes-slash') || null;
if (eyeSlashSignUpButton !== null) {
  eyeSlashSignUpButton.addEventListener('click', passwordSignUpAttributeUnHide);
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

const updateEmailButton = document.getElementById('update-email-button') || null;
if (updateEmailButton !== null) {
  updateEmailButton.addEventListener('click', changeEmailUser);
}

const updatePasswordButton = document.getElementById('update-password-button') || null;
if (updatePasswordButton !== null) {
  updatePasswordButton.addEventListener('click', changePasswordUser);
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

const deleteFoodDiaryButton = document.getElementById('delete-food-button') || null;
if (deleteFoodDiaryButton !== null) {
  deleteFoodDiaryButton.addEventListener('click', deleteFoodDiary);
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

const saveEditFoodDiaryButton = document.getElementById('save-food-edit-button') || null;
if (saveEditFoodDiaryButton !== null) {
  saveEditFoodDiaryButton.addEventListener('click', updateFoodDiary);
}
