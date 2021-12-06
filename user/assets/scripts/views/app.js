import UserProfileDrawerInitiator from '../utils/UserProfileDrawerInitiator.js';

class App {
  constructor({ buttonUserProfile, drawerUserProfile }) {
    this._buttonUserProfile = buttonUserProfile;
    this._drawerUserProfile = drawerUserProfile;
    
    this._initialAppShell();
  }

  _initialAppShell() {
    UserProfileDrawerInitiator.init({
      button: this._buttonUserProfile,
      drawer: this._drawerUserProfile,
    })
  }
}

export default App;