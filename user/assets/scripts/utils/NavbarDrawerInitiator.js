const NavbarDrawerInitiator = {
  init({ button, drawer }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer, button);
    });
  },

  _toggleDrawer(event, drawer, button) {
    event.stopPropagation();
    drawer.classList.toggle('show');
    button.classList.toggle('active');
  },
}

export default NavbarDrawerInitiator;