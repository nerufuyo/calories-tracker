import {connectToDatabase} from './database-connector.js';
import {getDatabase, set, ref, update, onValue} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

// Initialize Firebase
const app = connectToDatabase();
const database = getDatabase(app);
const auth = getAuth();


// Sign Up Functiom
export function setDataUser() {
  createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;

        set(ref(database, 'users/' + user.uid), {
          fullname: fullname.value,
          email: email.value,
        });
        alert('User Created!');
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
}

// Login Function
const loginButton = document.getElementById('login') || null;
if (loginButton !== null) {
  loginButton.addEventListener('click', (e) => {
    const email = document.getElementById('emails');
    const password = document.getElementById('passwords');

    if (email.value === '' || password.value === '') {
      alert('Please fill all fields!');
    } else {
      signInWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            const user = userCredential.user;
            const date = new Date();

            update(ref(database, 'users/' + user.uid), {
              last_login: date,
            });
            alert('User Logged in!');
            window.location.href = 'user-profile.html';
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
          });
    }
  });
}

// On State Function
onAuthStateChanged(auth, (user) => {
  if (user) {
    const fullname = document.getElementById('profile-fullname');
    const email = document.getElementById('profile-email');
    const birth = document.getElementById('profile-birth');
    const gender = document.getElementById('profile-gender');
    const height = document.getElementById('profile-height');
    const weight = document.getElementById('profile-weight');
    const databaseRef = ref(database, `users/${user.uid}`);

    onValue(databaseRef, (data) => {
      fullname.innerHTML = data.val().fullname;
      email.innerHTML = data.val().email;
      birth.innerHTML = data.val().birth;
      gender.innerHTML = data.val().gender;
      height.innerHTML = data.val().height;
      weight.innerHTML = data.val().weight;
    });
  }
});

// Log Out Function
const logoutButton = document.getElementById('logout') || null;
if (logoutButton !== null) {
  logoutButton.addEventListener('click', (e)=> {
    signOut(auth).then(() => {
      alert('Logout Succesfully!');
      window.location.href = 'authentication.html';
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
  });
}

// Forgot password Function
const forgotPasswordButton = document.getElementById('forgot-password') || null;
if (forgotPasswordButton !== null) {
  forgotPasswordButton.addEventListener('click', (e)=> {
    sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log('Silahkan Cek Email Anda!');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
  });
}

// Profile Full Name Edit Function
const editFullNameButton = document.getElementById('edit-profile-fullname-button') || null;
if (editFullNameButton !== null) {
  editFullNameButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-fullname');
    const inputName = document.getElementById('profile-fullname-input');
    const saveButton = document.getElementById('save-profile-fullname-button');
    const cancelButton = document.getElementById('cancel-profile-fullname-button');

    saveButton.style.display = 'flex';
    inputName.style.display = 'flex';
    editFullNameButton.style.display = 'none';
    textName.style.display = 'none';
    cancelButton.style.display = 'flex';
  });
}

const saveFullNameButton = document.getElementById('save-profile-fullname-button') || null;
if (saveFullNameButton !== null) {
  saveFullNameButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-fullname');
    const inputName = document.getElementById('profile-fullname-input');
    const editButton = document.getElementById('edit-profile-fullname-button');
    const cancelButton = document.getElementById('cancel-profile-fullname-button');

    if (inputName.value === '') {
      alert('Please Fill The Field!');
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const databaseRef = ref(database, `users/${user.uid}`);

          update(ref(database, 'users/' + user.uid), {
            fullname: inputName.value,
          });
        }
      });
      alert('Data Updated!  ');
      textName.style.display = 'flex';
      editButton.style.display = 'flex';
      inputName.style.display = 'none';
      saveFullNameButton.style.display = 'none';
      cancelButton.style.display = 'none';
    }
  });
}

const cancelFullNameButton = document.getElementById('cancel-profile-fullname-button') || null;
if (cancelFullNameButton !== null) {
  cancelFullNameButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-fullname');
    const inputName = document.getElementById('profile-fullname-input');
    const editButton = document.getElementById('edit-profile-fullname-button');
    const saveButton = document.getElementById('save-profile-fullname-button');

    textName.style.display = 'flex';
    editButton.style.display = 'flex';
    inputName.style.display = 'none';
    saveButton.style.display = 'none';
    cancelFullNameButton.style.display = 'none';
  });
}

// Profile Email Edit Function
const editEmailButton = document.getElementById('edit-profile-email-button') || null;
if (editEmailButton !== null) {
  editEmailButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-email');
    const inputName = document.getElementById('profile-email-input');
    const saveButton = document.getElementById('save-profile-email-button');
    const cancelButton = document.getElementById('cancel-profile-email-button');

    saveButton.style.display = 'flex';
    inputName.style.display = 'flex';
    editEmailButton.style.display = 'none';
    textName.style.display = 'none';
    cancelButton.style.display = 'flex';
  });
}

const saveEmailButton = document.getElementById('save-profile-email-button') || null;
if (saveEmailButton !== null) {
  saveEmailButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-email');
    const inputName = document.getElementById('profile-email-input');
    const editButton = document.getElementById('edit-profile-email-button');
    const cancelButton = document.getElementById('cancel-profile-email-button');

    if (inputName.value === '') {
      alert('Please Fill The Field!');
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const email = document.getElementById('profile-email');
          const databaseRef = ref(database, `users/${user.uid}`);

          update(ref(database, 'users/' + user.uid), {
            email: inputName.value,
          });
        }
      });
      alert('Data Updated!  ');
      textName.style.display = 'flex';
      editButton.style.display = 'flex';
      inputName.style.display = 'none';
      saveEmailButton.style.display = 'none';
      cancelButton.style.display = 'none';
    }
  });
}

const cancelEmailButton = document.getElementById('cancel-profile-email-button') || null;
if (cancelEmailButton !== null) {
  cancelEmailButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-email');
    const inputName = document.getElementById('profile-email-input');
    const editButton = document.getElementById('edit-profile-email-button');
    const saveButton = document.getElementById('save-profile-email-button');

    textName.style.display = 'flex';
    editButton.style.display = 'flex';
    inputName.style.display = 'none';
    saveButton.style.display = 'none';
    cancelEmailButton.style.display = 'none';
  });
}

// Profile Birth Edit Function
const editBirthButton = document.getElementById('edit-profile-birth-button') || null;
if (editBirthButton !== null) {
  editBirthButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-birth');
    const inputName = document.getElementById('profile-birth-input');
    const saveButton = document.getElementById('save-profile-birth-button');
    const cancelButton = document.getElementById('cancel-profile-birth-button');

    saveButton.style.display = 'flex';
    inputName.style.display = 'flex';
    editBirthButton.style.display = 'none';
    textName.style.display = 'none';
    cancelButton.style.display = 'flex';
  });
}

const saveBirthButton = document.getElementById('save-profile-birth-button') || null;
if (saveBirthButton !== null) {
  saveBirthButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-birth');
    const inputName = document.getElementById('profile-birth-input');
    const editButton = document.getElementById('edit-profile-birth-button');
    const cancelButton = document.getElementById('cancel-profile-birth-button');

    if (inputName.value === '') {
      alert('Please Fill The Field!');
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const databaseRef = ref(database, `users/${user.uid}`);

          update(ref(database, 'users/' + user.uid), {
            birth: inputName.value,
          });
        }
      });
      alert('Data Updated!  ');
      textName.style.display = 'flex';
      editButton.style.display = 'flex';
      inputName.style.display = 'none';
      saveBirthButton.style.display = 'none';
      cancelButton.style.display = 'none';
    }
  });
}

const cancelBirthButton = document.getElementById('cancel-profile-birth-button') || null;
if (cancelBirthButton !== null) {
  cancelBirthButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-birth');
    const inputName = document.getElementById('profile-birth-input');
    const editButton = document.getElementById('edit-profile-birth-button');
    const saveButton = document.getElementById('save-profile-birth-button');

    textName.style.display = 'flex';
    editButton.style.display = 'flex';
    inputName.style.display = 'none';
    saveButton.style.display = 'none';
    cancelBirthButton.style.display = 'none';
  });
}

// Profile Gender Edit Function
const editGenderButton = document.getElementById('edit-profile-gender-button') || null;
if (editGenderButton !== null) {
  editGenderButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-gender');
    const inputName = document.getElementById('profile-gender-input');
    const saveButton = document.getElementById('save-profile-gender-button');
    const cancelButton = document.getElementById('cancel-profile-gender-button');

    saveButton.style.display = 'flex';
    inputName.style.display = 'flex';
    editGenderButton.style.display = 'none';
    textName.style.display = 'none';
    cancelButton.style.display = 'flex';
  });
}

const saveGenderButton = document.getElementById('save-profile-gender-button') || null;
if (saveGenderButton !== null) {
  saveGenderButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-gender');
    const inputName = document.getElementById('profile-gender-input');
    const editButton = document.getElementById('edit-profile-gender-button');
    const cancelButton = document.getElementById('cancel-profile-gender-button');

    if (inputName.value === '') {
      alert('Please Fill The Field!');
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const databaseRef = ref(database, `users/${user.uid}`);

          update(ref(database, 'users/' + user.uid), {
            gender: inputName.value,
          });
        }
      });
      alert('Data Updated!  ');
      textName.style.display = 'flex';
      editButton.style.display = 'flex';
      inputName.style.display = 'none';
      saveGenderButton.style.display = 'none';
      cancelButton.style.display = 'none';
    }
  });
}

const cancelGenderButton = document.getElementById('cancel-profile-gender-button') || null;
if (cancelGenderButton !== null) {
  cancelGenderButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-gender');
    const inputName = document.getElementById('profile-gender-input');
    const editButton = document.getElementById('edit-profile-gender-button');
    const saveButton = document.getElementById('save-profile-gender-button');

    textName.style.display = 'flex';
    editButton.style.display = 'flex';
    inputName.style.display = 'none';
    saveButton.style.display = 'none';
    cancelGenderButton.style.display = 'none';
  });
}

// Profile Height Edit Function
const editHeightButton = document.getElementById('edit-profile-height-button') || null;
if (editHeightButton !== null) {
  editHeightButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-height');
    const inputName = document.getElementById('profile-height-input');
    const saveButton = document.getElementById('save-profile-height-button');
    const cancelButton = document.getElementById('cancel-profile-height-button');

    saveButton.style.display = 'flex';
    inputName.style.display = 'flex';
    editHeightButton.style.display = 'none';
    textName.style.display = 'none';
    cancelButton.style.display = 'flex';
  });
}

const saveHeightButton = document.getElementById('save-profile-height-button') || null;
if (saveHeightButton !== null) {
  saveHeightButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-height');
    const inputName = document.getElementById('profile-height-input');
    const editButton = document.getElementById('edit-profile-height-button');
    const cancelButton = document.getElementById('cancel-profile-height-button');

    if (inputName.value === '') {
      alert('Please Fill The Field!');
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const databaseRef = ref(database, `users/${user.uid}`);

          update(ref(database, 'users/' + user.uid), {
            height: inputName.value,
          });
        }
      });
      alert('Data Updated!  ');
      textName.style.display = 'flex';
      editButton.style.display = 'flex';
      inputName.style.display = 'none';
      saveHeightButton.style.display = 'none';
      cancelButton.style.display = 'none';
    }
  });
}

const cancelHeightButton = document.getElementById('cancel-profile-height-button') || null;
if (cancelHeightButton !== null) {
  cancelHeightButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-height');
    const inputName = document.getElementById('profile-height-input');
    const editButton = document.getElementById('edit-profile-height-button');
    const saveButton = document.getElementById('save-profile-height-button');

    textName.style.display = 'flex';
    editButton.style.display = 'flex';
    inputName.style.display = 'none';
    saveButton.style.display = 'none';
    cancelHeightButton.style.display = 'none';
  });
}

// Profile Weight Edit Function
const editWeightButton = document.getElementById('edit-profile-weight-button') || null;
if (editWeightButton !== null) {
  editWeightButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-weight');
    const inputName = document.getElementById('profile-weight-input');
    const saveButton = document.getElementById('save-profile-weight-button');
    const cancelButton = document.getElementById('cancel-profile-weight-button');

    saveButton.style.display = 'flex';
    inputName.style.display = 'flex';
    editWeightButton.style.display = 'none';
    textName.style.display = 'none';
    cancelButton.style.display = 'flex';
  });
}

const saveWeightButton = document.getElementById('save-profile-weight-button') || null;
if (saveWeightButton !== null) {
  saveWeightButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-weight');
    const inputName = document.getElementById('profile-weight-input');
    const editButton = document.getElementById('edit-profile-weight-button');
    const cancelButton = document.getElementById('cancel-profile-weight-button');

    if (inputName.value === '') {
      alert('Please Fill The Field!');
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const databaseRef = ref(database, `users/${user.uid}`);

          update(ref(database, 'users/' + user.uid), {
            weight: inputName.value,
          });
        }
      });
      alert('Data Updated!  ');
      textName.style.display = 'flex';
      editButton.style.display = 'flex';
      inputName.style.display = 'none';
      saveWeightButton.style.display = 'none';
      cancelButton.style.display = 'none';
    }
  });
}

const cancelWeightButton = document.getElementById('cancel-profile-weight-button') || null;
if (cancelWeightButton !== null) {
  cancelWeightButton.addEventListener('click', (e)=> {
    const textName = document.getElementById('profile-weight');
    const inputName = document.getElementById('profile-weight-input');
    const editButton = document.getElementById('edit-profile-weight-button');
    const saveButton = document.getElementById('save-profile-weight-button');

    textName.style.display = 'flex';
    editButton.style.display = 'flex';
    inputName.style.display = 'none';
    saveButton.style.display = 'none';
    cancelWeightButton.style.display = 'none';
  });
}
