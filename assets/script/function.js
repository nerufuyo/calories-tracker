/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import {connectToDatabase} from './database-connector.js';
import {getStorage, ref as refStorage, uploadBytesResumable, getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js';
import {getFirestore, collection, updateDoc, deleteDoc, addDoc, setDoc, doc} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import {getAuth, reauthenticateWithCredential, updatePassword, sendEmailVerification, updateEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

// Initialize Firebase
export const app = connectToDatabase();
export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
const files = [];

// Cookies
export function getCookie(name) {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(';');

  for (let i=0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cookieName) == 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
  return '';
}

export function checkCookie() {
  const user = getCookie('user');
  if (user !== '') {
    alert(`Welcome ${user}`);
  } else {
    alert('Cookie Not Found');
    window.location.reload;
    window.location.href = 'authentication.html';
  }
}

// Authentication
export async function signUpNewUser() {
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const loginForm = document.querySelector('div.form-collection div.login-form');
  const registerForm = document.querySelector('div.form-collection div.signup-form');

  if (fullname.value === '' || email.value === '' || password.value === '') {
    alert('Please fill all fields!');
  } else {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const databaseRef = doc(database, `userProfile`, `${user.uid}`);

          setDoc(databaseRef, {
            fullname: fullname.value,
          });
          alert('Account Created!');
          loginForm.style.display = 'flex';
          registerForm.style.display = 'none';
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
        .then(async (userCredential) => {
          const user = userCredential.user;
          const databaseRef = doc(database, `userProfile`, `${user.uid}`);
          const date = new Date();

          await updateDoc(databaseRef, {last_login: date});
          console.log(date);
          console.log('User Logged in!');
          document.cookie = `user= ${user.uid}; expires=Thu, 18 Dec 2012`;
          // window.location.href = 'user-profile.html';
          window.location.href = '/user';
          // window.location.href = 'update-email-password.html'
          // window.location.href = 'index.html';
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
    document.cookie = `user= ; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    window.location.reload;
    window.location.href = 'authentication.html';
  }).catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);
  });
}

export function switchFromLoginForm() {
  const loginForm = document.querySelector('div.form-collection div.login-form');
  const registerForm = document.querySelector('div.form-collection div.signup-form');

  loginForm.style.display = 'none';
  registerForm.style.display = 'flex';
}

export function switchFromSignUpForm() {
  const loginForm = document.querySelector('div.form-collection div.login-form');
  const registerForm = document.querySelector('div.form-collection div.signup-form');

  loginForm.style.display = 'flex';
  registerForm.style.display = 'none';
}


// Profile CRUD
export function updateProfile() {
  onAuthStateChanged(auth, async (user) => {
    const databaseRef = doc(database, `userProfile`, `${user.uid}`);
    const fullname = document.getElementById('profile-fullname-input');
    const email = document.getElementById('profile-email-input');
    const birth = document.getElementById('profile-birth-input');
    const gender = document.getElementById('profile-gender-input');
    const height = document.getElementById('profile-height-input');
    const weight = document.getElementById('profile-weight-input');
    const buttonGroup =document.querySelector('div.profile-button-group');
    const editButton = document.getElementById('profile-edit-button');

    await updateDoc(databaseRef, {
      fullname: fullname.value,
      email: email.value,
      birth: birth.value,
      gender: gender.value,
      height: height.value,
      weight: weight.value,
    });

    alert('Data Updated!');
    fullname.disabled = true;
    email.disabled = true;
    birth.disabled = true;
    gender.disabled = true;
    height.disabled = true;
    weight.disabled = true;
    buttonGroup.style.display = 'none';
    editButton.style.display = 'flex';
  });
}

export function selectPhotoProfile() {
  const imageName = document.getElementById('image-name');
  const imageExtension = document.getElementById('image-extension');
  const files = event.target.files;
  const reader = new FileReader();
  const getExtension = getFileExtension(files[0]);
  const getName = getFileName(files[0]);
  reader.onload = function() {
    const dataURL = reader.result;
    const output = document.getElementById('image-preview');
    output.src = dataURL;
  };
  imageName.value = getName;
  imageExtension.innerHTML = getExtension;
  reader.readAsDataURL(files[0]);
}

function getFileName(file) {
  const temp = file.name.split('.');
  const fname = temp.slice(0, -1).join('.');
  return fname;
}

function getFileExtension(file) {
  const temp = file.name.split('.');
  const ext = temp.slice((temp.length-1), (temp.length));
  return '.' + ext[0];
}

export function uploadPhotoProfile() {
  onAuthStateChanged(auth, (user) => {
    const imageSelected = files[0];
    const imageName = document.getElementById('image-name');
    const imageExtension = document.getElementById('image-extension');
    const imageFormat = imageName.value + imageExtension.innerHTML;
    const metadata = {contentType: 'Image'};
    const storageRef = refStorage(storage, `users/profile/${imageFormat}`);
    const uploadTask = uploadBytesResumable(storageRef, imageSelected, metadata);

    if (!validateFileName()) {
      alert('name cannot contain "#", "$", "[", or "]"');
      return;
    };
    uploadTask.on('state_changed', (snapshot)=> {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress} % done`);
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        function saveURLToDatabase(URL) {
          const imageName = document.getElementById('image-name');
          const imageExtension = document.getElementById('image-extension');
          const getName = imageName.value;
          const getExtension = imageExtension.innerHTML;

          update(ref(database, `users/${user.uid}/profile/`), {
            image_name: (getName + getExtension),
            image_url: URL,
          });
        }
        saveURLToDatabase(downloadURL);
      });
    });
  });
}

function validateFileName() {
  const regex = /[\.#$\[]]/;
  const imageName = document.getElementById('image-name');
  return !(regex.test(imageName.value));
}

export function changeEmailUser() {
  const email = document.getElementById('new-email');

  if (email.value == '') {
    alert('Please Fill The Fields');
  } else {
    updateEmail(auth.currentUser, email.value).then(() => {
      console.log('Email Updated');
      sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log('Email Verification Send');
          });
    }).catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }
}

export function changePasswordUser() {
  const user = auth.currentUser;
  const credential = promptForCredentials();
  const password = document.getElementById('verify-new-password');

  if (password.value == '') {
    alert('Please Fill The Fields!');
  } else {
    updatePassword(user, password.value).then(() => {
      console.log('Password Updated!');
      reauthenticateWithCredential(user, password.value).then(() => {
        console.log('Password Verification!');
      }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
    });
  }
}

// Food CRUD
export function addFoodDiary() {
  onAuthStateChanged(auth, async (user) => {
    const databaseRef = collection(database, `foodDiaries`);
    const dateObj = new Date();
    // Element Variable
    const foodName = document.getElementById('food-name-input');
    const foodSize = document.getElementById('food-size-input');
    const foodCategory = document.getElementById('food-category-input');
    const foodCalories = document.getElementById('food-calories-input');
    const foodDate = document.getElementById('food-date-input');
    const buttonGroup =document.getElementById('food-button-group');
    const editButton = document.getElementById('add-food-button');

    if (foodName.value, foodSize.value, foodCalories.value, foodCategory.value, foodDate.value !== '') {
      await addDoc(databaseRef, {
        user_id: user.uid,
        food_name: foodName.value,
        food_size: foodSize.value,
        food_category: foodCategory.value,
        food_calories: foodCalories.value,
        food_date: foodDate.value,
      });

      alert('Food Added!');
      foodName.disabled = true;
      foodSize.disabled = true;
      foodCategory.disabled = true;
      foodCalories.disabled = true;
      foodDate.disabled = true;
      buttonGroup.style.display = 'none';
      editButton.style.display = 'flex';
    } else {
      alert('Fill All Fields!');
    }
  });
}

export function updateFoodDiary() {
  onAuthStateChanged(auth, async (user) => {
    const dateObj = new Date();
    // Element Variable
    const foodId = document.getElementById('food-id-edit-input');
    const foodName = document.getElementById('food-name-edit-input');
    const foodSize = document.getElementById('food-size-edit-input');
    const foodCategory = document.getElementById('food-category-edit-input');
    const foodCalories = document.getElementById('food-calories-edit-input');
    const foodDate = document.getElementById('food-date-edit-input');
    const buttonGroup =document.getElementById('food-edit-button-group');
    const editButton = document.getElementById('edit-food-button');
    const databaseFoodRef = doc(database, `foodDiaries`, foodId.value);

    if (foodName.value, foodSize.value, foodCalories.value, foodCategory.value, foodDate.value !== '') {
      await updateDoc(databaseFoodRef, {
        food_name: foodName.value,
        food_size: foodSize.value,
        food_category: foodCategory.value,
        food_calories: foodCalories.value,
        food_date: foodDate.value,
      });

      alert('Food Updated!');
      foodName.disabled = true;
      foodSize.disabled = true;
      foodCategory.disabled = true;
      foodCalories.disabled = true;
      foodDate.disabled = true;
      buttonGroup.style.display = 'none';
      editButton.style.display = 'flex';
    } else {
      alert('Fill All Fields!');
    }
  });
}

export function deleteFoodDiary() {
  onAuthStateChanged(auth, async (user) => {
    const dateObj = new Date();
    // Element Variable
    const foodId = document.getElementById('food-id-edit-input');
    const foodName = document.getElementById('food-name-edit-input');
    const foodSize = document.getElementById('food-size-edit-input');
    const foodCategory = document.getElementById('food-category-edit-input');
    const foodCalories = document.getElementById('food-calories-edit-input');
    const foodDate = document.getElementById('food-date-edit-input');
    const buttonGroup =document.getElementById('food-edit-button-group');
    const editButton = document.getElementById('edit-food-button');
    const databaseFoodRef = doc(database, `foodDiaries`, foodId.value);

    if (foodName.value, foodSize.value, foodCalories.value, foodCategory.value, foodDate.value !== '') {
      await deleteDoc(databaseFoodRef, {
        food_name: foodName.value,
        food_size: foodSize.value,
        food_category: foodCategory.value,
        food_calories: foodCalories.value,
        food_date: foodDate.value,
      });

      alert('Food Deleted!');
      window.location.reload;
    } else {
      alert('Fill All Fields!');
    }
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

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
}

export function removeProfileAttributDisabled() {
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

export function setProfileAttributeDisable() {
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

export function removeFoodAttributDisabled() {
  const foodName = document.getElementById('food-name-input');
  const foodSize = document.getElementById('food-size-input');
  const foodCategory = document.getElementById('food-category-input');
  const foodCalories = document.getElementById('food-calories-input');
  const foodDate = document.getElementById('food-date-input');
  const buttonGroup = document.getElementById('food-button-group');
  const addButton = document.getElementById('add-food-button');

  foodName.disabled = false;
  foodSize.disabled = false;
  foodCategory.disabled = false;
  foodCalories.disabled = false;
  foodDate.disabled = false;
  buttonGroup.style.display = 'flex';
  addButton.style.display = 'none';
}

export function setFoodAttributDisabled() {
  const foodName = document.getElementById('food-name-input');
  const foodSize = document.getElementById('food-size-input');
  const foodCategory = document.getElementById('food-category-input');
  const foodCalories = document.getElementById('food-calories-input');
  const foodDate = document.getElementById('food-date-input');
  const buttonGroup = document.getElementById('food-button-group');
  const addButton = document.getElementById('add-food-button');

  foodName.disabled = true;
  foodSize.disabled = true;
  foodCategory.disabled = true;
  foodCalories.disabled = true;
  foodDate.disabled = true;
  buttonGroup.style.display = 'none';
  addButton.style.display = 'flex';
}

export function removeEditFoodAttributDisabled() {
  const foodName = document.getElementById('food-name-edit-input');
  const foodSize = document.getElementById('food-size-edit-input');
  const foodCategory = document.getElementById('food-category-edit-input');
  const foodCalories = document.getElementById('food-calories-edit-input');
  const foodDate = document.getElementById('food-date-edit-input');
  const buttonGroup = document.getElementById('food-edit-button-group');
  const editButton = document.getElementById('edit-food-button');

  foodName.disabled = false;
  foodSize.disabled = false;
  foodCategory.disabled = false;
  foodCalories.disabled = false;
  foodDate.disabled = false;
  buttonGroup.style.display = 'flex';
  editButton.style.display = 'none';
}

export function setEditFoodAttributDisabled() {
  const foodName = document.getElementById('food-name-edit-input');
  const foodSize = document.getElementById('food-size-edit-input');
  const foodCategory = document.getElementById('food-category-edit-input');
  const foodCalories = document.getElementById('food-calories-edit-input');
  const foodDate = document.getElementById('food-date-edit-input');
  const buttonGroup = document.getElementById('food-edit-button-group');
  const editButton = document.getElementById('edit-food-button');

  foodName.disabled = true;
  foodSize.disabled = true;
  foodCategory.disabled = true;
  foodCalories.disabled = true;
  foodDate.disabled = true;
  buttonGroup.style.display = 'none';
  editButton.style.display = 'flex';
}

export function passwordAttributeHide() {
  const loginPassword = document.getElementById('passwords') || null;
  const eye = document.getElementById('eye') || null;
  const eyeSlash = document.getElementById('eye-slash') || null;

  if (loginPassword !== null) {
    loginPassword.setAttribute('type', 'password');
    eye.style.display = 'none';
    eyeSlash.style.display = 'flex';
  }
}

export function passwordAttributeUnHide() {
  const loginPassword = document.getElementById('passwords') || null;
  const eye = document.getElementById('eye') || null;
  const eyeSlash = document.getElementById('eye-slash') || null;

  if (loginPassword !== null) {
    loginPassword.setAttribute('Type', 'Text');
    eye.style.display = 'flex';
    eyeSlash.style.display = 'none';
  }
}

export function passwordSignUpAttributeHide() {
  const signupPassword = document.getElementById('password') || null;
  const eyes = document.getElementById('eyes') || null;
  const eyesSlash = document.getElementById('eyes-slash') || null;

  if (signupPassword !== null) {
    signupPassword.setAttribute('Type', 'Password');
    eyes.style.display = 'none';
    eyesSlash.style.display = 'flex';
  }
}

export function passwordSignUpAttributeUnHide() {
  const signupPassword = document.getElementById('password') || null;
  const eyes = document.getElementById('eyes') || null;
  const eyesSlash = document.getElementById('eyes-slash') || null;

  if (signupPassword !== null) {
    signupPassword.setAttribute('type', 'text');
    eyes.style.display = 'flex';
    eyesSlash.style.display = 'none';
  }
}
