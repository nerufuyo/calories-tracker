import DateHelper from './utils/DateHelper.js';
import App from './views/app.js';
import UserDb from './data/UserDb.js';
import isUserLogin from './utils/isUserLogin.js';
import LogoutHelper from './utils/LogoutHelper.js';

const app = new App({
  userProfileNameElement: document.querySelector('.user-profile__name'),
  userDb: UserDb,
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
  const unsubAuth = isUserLogin();
  LogoutHelper.init({
    logoutButton: document.querySelector('.logout-button'),
    unsubAuth: unsubAuth,
  });

  DateHelper.setMonthDaysPrototype();

  app.renderPage();
});