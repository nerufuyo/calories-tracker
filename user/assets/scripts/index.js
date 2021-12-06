import App from './views/App.js';

const app = new App({
  buttonUserProfile: document.querySelector('.user-profile__info'),
  drawerUserProfile: document.querySelector('.user-profile__dropdown'),
  buttonNavbar: document.querySelector('.app-bar_menu-hamburger'),
  drawerNavbar: document.querySelector('.sidenav'),
});
