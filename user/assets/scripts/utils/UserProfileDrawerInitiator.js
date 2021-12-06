const UserProfileDrawerInitiator = {
  init({ button, drawer }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    window.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    if (!event.target.matches(drawer.classList[0])) {
      if (drawer.classList.contains('show')) {
        drawer.classList.remove('show');
      }
    }
  }
}