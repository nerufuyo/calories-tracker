const NavbarDrawerInitiator = {
  init({ button, drawer, mainElement, footerElement }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer({ event, drawer, button, mainElement, footerElement });
    });
  },

  _toggleDrawer({ event, drawer, button, mainElement, footerElement }) {
    event.stopPropagation();
    drawer.classList.toggle('show');
    button.classList.toggle('active');
    mainElement.classList.toggle('shift');
    footerElement.classList.toggle('shift');
  },
}

export default NavbarDrawerInitiator;