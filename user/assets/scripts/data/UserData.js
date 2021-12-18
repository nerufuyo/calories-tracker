import userDummy from './userDummy.js';

const UserData = {
  async getById(id) {
    if (!id) {
      return;
    }

    return userDummy.find((user) => user.id === id);
  },
};

export default UserData;
