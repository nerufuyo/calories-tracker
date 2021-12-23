const NavbarDrawerInitiator = {
  init({button, drawer, mainElement, footerElement}) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer({event, drawer, button, mainElement, footerElement});
    });

    window.addEventListener('click', (event) => {
      this._closeDrawer({event, button, drawer, mainElement, footerElement});
    })
  },

  _toggleDrawer({event, drawer, button, mainElement, footerElement}) {
    event.stopPropagation();
    drawer.classList.toggle('show');
    button.classList.toggle('active');
    mainElement.classList.toggle('shift');
    footerElement.classList.toggle('shift');
  },

  _closeDrawer({event, button, drawer, mainElement, footerElement}) {
    if (window.screen.width <= 900)
      if (!event.target.matches(drawer.classList[0])) {
        button.classList.remove('active');
        drawer.classList.remove('show');
        mainElement.classList.remove('shift');
        footerElement.classList.remove('shift');
      }
  },
};

export default NavbarDrawerInitiator;
