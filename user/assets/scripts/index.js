import DateHelper from './utils/DateHelper.js';
import App from './views/App.js';
import UserData from './data/UserData.js';
import userLoginTest from './utils/UserLoginTest.js';
import isUserLogin from './utils/IsUserLogin.js';

const app = new App({
  userProfileNameElement: document.querySelector('.user-profile__name'),
  userDb: UserData,
  buttonUserProfile: document.querySelector('.user-profile__info'),
  drawerUserProfile: document.querySelector('.user-profile__dropdown'),
  buttonNavbar: document.querySelector('.app-bar_menu-hamburger'),
  drawerNavbar: document.querySelector('.sidenav'),
  mainElement: document.querySelector('main'),
  pageTitle: document.querySelector('.page-title'),
  pageContent: document.querySelector('.page-content'),
  footerElement: document.querySelector('footer'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  userLoginTest();

  isUserLogin();

  DateHelper.setMonthDaysPrototype();

  app.renderPage();
});
