const UserProfileNameHeaderGenerator = {
  async init(userProfileNameElement, userDb) {
    const user = await userDb.getUser();
    this._generateUserProfileName(userProfileNameElement, user);
  },

  _generateUserProfileName(userProfileNameElement, user) {
    userProfileNameElement.innerHTML = user.fullname;
  },
};

export default UserProfileNameHeaderGenerator;
