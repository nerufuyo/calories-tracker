import FooterYearGenerator from '../utils/FooterYearGenerator.js';
import NavbarDrawerInitiator from '../utils/NavbarDrawerInitiator.js';
import UserProfileDrawerInitiator from '../utils/UserProfileDrawerInitiator.js';

class App {
  constructor({ buttonUserProfile, drawerUserProfile, buttonNavbar, drawerNavbar, footerElement }) {
    this._buttonUserProfile = buttonUserProfile;
    this._drawerUserProfile = drawerUserProfile;
    this._buttonNavbar = buttonNavbar;
    this._drawerNavbar = drawerNavbar;
    this._footerElement = footerElement;
    
    this._initialAppShell();
  }

  _initialAppShell() {
    UserProfileDrawerInitiator.init({
      button: this._buttonUserProfile,
      drawer: this._drawerUserProfile,
    })

    NavbarDrawerInitiator.init({
      button: this._buttonNavbar,
      drawer: this._drawerNavbar,
      footerElement: this._footerElement,
    })
    
    FooterYearGenerator.init(this._footerElement.querySelector('.footer-year'));
  }
}

export default App;