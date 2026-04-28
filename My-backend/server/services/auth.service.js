const usersRepository = require('../repositories/users.repository');
const userMapper = require('../mappers/user.mapper');

const authService = {
  async register({ email, password, displayName }) {
    const userRecord = await usersRepository.authCreateUser({
      email,
      password,
      displayName,
    });
    const userDoc = await usersRepository.createDoc(userRecord.uid, {
      email,
      role: 'user',
    });
    return userMapper.publicProfile(userDoc);
  },

  async me(uid, email) {
    const userDoc = await usersRepository.findByUid(uid);
    return {
      uid,
      email,
      role: userDoc?.role || 'user',
    };
  },

  async sync({ uid, email }) {
    const userDoc = await usersRepository.upsertOnLogin(uid, email);
    return userMapper.publicProfile(userDoc);
  },
};

module.exports = authService;
