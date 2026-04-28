const usersRepository = require('../repositories/users.repository');
const userMapper = require('../mappers/user.mapper');
const { HttpError } = require('../utils/http-error');

const profileService = {
  async get(uid) {
    const userDoc = await usersRepository.findByUid(uid);
    if (!userDoc) throw new HttpError(404, 'User not found', 'USER_NOT_FOUND');
    return userMapper.publicProfile(userDoc);
  },

  async update(uid, profile) {
    const userDoc = await usersRepository.updateProfile(uid, profile);
    if (!userDoc) throw new HttpError(404, 'User not found', 'USER_NOT_FOUND');
    return userMapper.publicProfile(userDoc);
  },
};

module.exports = profileService;
