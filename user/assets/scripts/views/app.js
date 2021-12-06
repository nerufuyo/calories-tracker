import UserProfileDrawerInitiator from '../utils/UserProfileDrawerInitiator';

class App {
  constructor({ button, drawer }) {
    this._button = button;
    this._drawer = drawer;
    
    this._initialAppShell();
  }

  _initialAppShell() {
    UserProfileDrawerInitiator.init({
      button: this._button;
      drawer: this._drawer;
    })
  }
}

export default App;