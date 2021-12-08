const NavbarDrawerInitiator = {
  init({ button, drawer, footerElement }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer, button, footerElement);
    });
  },

  _toggleDrawer(event, drawer, button, footerElement) {
    event.stopPropagation();
    drawer.classList.toggle('show');
    button.classList.toggle('active');
    footerElement.classList.toggle('shift');
  },
}

export default NavbarDrawerInitiator;