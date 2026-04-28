const usersRepository = require('../repositories/users.repository');
const userMapper = require('../mappers/user.mapper');
const { HttpError } = require('../utils/http-error');

const usersService = {
  async list() {
    const docs = await usersRepository.list();
    return docs.map(userMapper.adminListItem);
  },

  async create({ email, password, role = 'user' }) {
    const userRecord = await usersRepository.authCreateUser({ email, password });
    const userDoc = await usersRepository.createDoc(userRecord.uid, {
      email,
      role,
    });
    return userMapper.publicProfile(userDoc);
  },

  async delete(uid, currentUid) {
    if (uid === currentUid) {
      throw new HttpError(400, 'Cannot delete yourself', 'SELF_DELETE');
    }
    const exists = await usersRepository.findByUid(uid);
    if (!exists) {
      throw new HttpError(404, 'User not found', 'USER_NOT_FOUND');
    }
    await usersRepository.authDeleteUser(uid);
    await usersRepository.delete(uid);
  },
};

module.exports = usersService;
