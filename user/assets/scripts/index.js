import userDummy from './data/userDummy.js';
import CookieHelper from './utils/CookieHelper.js';
import App from './views/App.js';

const app = new App({
  buttonUserProfile: document.querySelector('.user-profile__info'),
  drawerUserProfile: document.querySelector('.user-profile__dropdown'),
  buttonNavbar: document.querySelector('.app-bar_menu-hamburger'),
  drawerNavbar: document.querySelector('.sidenav'),
  footerElement: document.querySelector('footer'),
});

window.addEventListener('load', () => {
  CookieHelper.setCookie({
    cname: 'userId',
    cvalue: userDummy.id,
    exdays: 365,
  });
});
