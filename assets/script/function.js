  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

  // Database Connector 
  const firebaseConfig = {
    apiKey: "AIzaSyBimK7bj-2HR_T1_wCvXf289Bs-WbO3gLE",
    authDomain: "calories-tracker-a6aa0.firebaseapp.com",
    databaseURL: "https://calories-tracker-a6aa0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "calories-tracker-a6aa0",
    storageBucket: "calories-tracker-a6aa0.appspot.com",
    messagingSenderId: "337143761839",
    appId: "1:337143761839:web:d8e0cb4bd98ad4baac3d5a",
    measurementId: "G-PHL9R1Z9KW"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();

  const signUpButton = document.getElementById('signup');
  const loginButton = document.getElementById('login')

  // Sign Up Function
  signUpButton.addEventListener('click', (e)=> {
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;

    set(ref(database, 'users/' + user.uid), {
      fullname: fullname,
      email: email
    })
 
    alert('User Created!')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage)
  });
  })

  // Login Function
  loginButton.addEventListener('click', (e)=> {
    const email = document.getElementById('emails').value;
    const password = document.getElementById('passwords').value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    const date = new Date();

    update(ref(database, 'users/' + user.uid), {
      last_login: date,
    })

    alert('User Logged in!')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert('User Created!')
  });
  })

  