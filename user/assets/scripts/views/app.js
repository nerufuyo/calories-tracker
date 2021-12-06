import NavbarDrawerInitiator from '../utils/NavbarDrawerInitiator.js';
import UserProfileDrawerInitiator from '../utils/UserProfileDrawerInitiator.js';

class App {
  constructor({ buttonUserProfile, drawerUserProfile, buttonNavbar, drawerNavbar }) {
    this._buttonUserProfile = buttonUserProfile;
    this._drawerUserProfile = drawerUserProfile;
    this._buttonNavbar = buttonNavbar;
    this._drawerNavbar = drawerNavbar;
    
    this._initialAppShell();
  }

  _initialAppShell() {
    UserProfileDrawerInitiator.init({
      button: this._buttonUserProfile,
      drawer: this._drawerUserProfile,
    })

    NavbarDrawerInitiator({
      button: this._buttonNavbar,
      drawer: this._drawerNavbar,
    })
  }
}

export default App;