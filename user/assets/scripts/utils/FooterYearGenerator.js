const FooterYearGenerator = {
  init(element) {
    this._generateYear(element);
  },

  _generateYear(element) {
    const d = new Date();
    let year = d.getFullYear();

    element.innerHTML = year;
  }
};

export default FooterYearGenerator;