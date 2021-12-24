import FooterYearGenerator from '../utils/FooterYearGenerator.js';
import NavbarDrawerInitiator from '../utils/NavbarDrawerInitiator.js';
import UserProfileNameHeaderGenerator
  from '../utils/UserProfileNameHeaderGenerator.js';
import UserProfileDrawerInitiator from '../utils/UserProfileDrawerInitiator.js';
import UrlParser from '../routes/UrlParser.js';
import routes from '../routes/routes.js';

class App {
  constructor({
    userProfileNameElement,
    userDb,
    buttonUserProfile,
    drawerUserProfile,
    buttonNavbar,
    drawerNavbar,
    mainElement,
    pageTitle,
    pageContent,
    footerElement,
  }) {
    this._userProfileNameElement = userProfileNameElement;
    this._userDb = userDb,
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
    UserProfileNameHeaderGenerator.init(
        this._userProfileNameElement,
        this._userDb,
    );

    UserProfileDrawerInitiator.init({
      button: this._buttonUserProfile,
      drawer: this._drawerUserProfile,
    });

    NavbarDrawerInitiator.init({
      button: this._buttonNavbar,
      drawer: this._drawerNavbar,
      mainElement: this._mainElement,
      footerElement: this._footerElement,
    });

    FooterYearGenerator.init(this._footerElement.querySelector('.footer-year'));
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    this._pageTitle.innerHTML = '';
    this._pageContent.innerHTML = '';

    const {title, content} = await page.render();
    this._pageTitle.innerHTML = title;
    this._pageContent.innerHTML = content;

    await page.afterRender();
  }
}

export default App;
