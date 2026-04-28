const { admin, db } = require('../firebase');

const COLLECTION = 'users';

const usersRepository = {
  async findByUid(uid) {
    const doc = await db.collection(COLLECTION).doc(uid).get();
    if (!doc.exists) return null;
    return { uid: doc.id, ...doc.data() };
  },

  async createDoc(uid, data) {
    await db.collection(COLLECTION).doc(uid).set({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return this.findByUid(uid);
  },

  async upsertOnLogin(uid, email) {
    const ref = db.collection(COLLECTION).doc(uid);
    const doc = await ref.get();
    if (!doc.exists) {
      await ref.set({
        email,
        role: 'user',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    const fresh = await ref.get();
    return { uid, ...fresh.data() };
  },

  async list() {
    const snap = await db.collection(COLLECTION).get();
    return snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
  },

  async delete(uid) {
    await db.collection(COLLECTION).doc(uid).delete();
  },

  async updateProfile(uid, profile) {
    const ref = db.collection(COLLECTION).doc(uid);
    const doc = await ref.get();
    if (!doc.exists) return null;
    await ref.set(
      {
        profile: { ...(doc.data().profile || {}), ...profile },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
    const fresh = await ref.get();
    return { uid: fresh.id, ...fresh.data() };
  },

  // Auth-system facade (separate from Firestore profile docs)
  async authCreateUser({ email, password, displayName }) {
    return admin.auth().createUser({ email, password, displayName });
  },

  async authDeleteUser(uid) {
    return admin.auth().deleteUser(uid);
  },
};

module.exports = usersRepository;
