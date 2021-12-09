import FooterYearGenerator from '../utils/FooterYearGenerator.js';
import NavbarDrawerInitiator from '../utils/NavbarDrawerInitiator.js';
import UserProfileDrawerInitiator from '../utils/UserProfileDrawerInitiator.js';
import UrlParser from '../routes/UrlParser.js';
import routes from '../routes/routes.js';

class App {
  constructor({ 
    buttonUserProfile, drawerUserProfile, buttonNavbar, drawerNavbar, mainElement, pageTitle, pageContent, footerElement, 
  }) {
    this._buttonUserProfile = buttonUserProfile;
    this._drawerUserProfile = drawerUserProfile;
    this._buttonNavbar = buttonNavbar;
    this._drawerNavbar = drawerNavbar;
    this._mainElement = mainElement;
    this._pageTitle = pageTitle;
    this._pageContent = pageContent;
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
      mainElement: this._mainElement,
      footerElement: this._footerElement,
    })
    
    FooterYearGenerator.init(this._footerElement.querySelector('.footer-year'));
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    const {title, content} = await page.render();
    this._pageTitle.innerHTML = title;
    this._pageContent.innerHTML = content;
  }
}

export default App;