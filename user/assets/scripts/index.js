import UserData from './data/UserData.js';
import CookieHelper from './utils/CookieHelper.js';
import DateHelper from './utils/DateHelper.js';
import App from './views/App.js';

const app = new App({
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

  DateHelper.setMonthDaysPrototype();

  CookieHelper.setCookie({
    cname: 'userId',
    cvalue: UserData.getById(12345678).id,
    exdays: 365,
  });

  app.renderPage();
});
