const { db } = require('../firebase');

const COLLECTION = 'allShops';

const shopsRepository = {
  async findAll() {
    const snap = await db.collection(COLLECTION).get();
    const shops = snap.docs.map((d) => d.data());
    shops.sort((a, b) => Number(a.id) - Number(b.id));
    return shops;
  },

  async findById(id) {
    const doc = await db.collection(COLLECTION).doc(String(id)).get();
    if (!doc.exists) return null;
    return doc.data();
  },

  async count() {
    const snap = await db.collection(COLLECTION).count().get();
    return snap.data().count;
  },

  async create(payload) {
    // simple sequential id; safe enough at this scale
    const total = await this.count();
    const id = total + 1;
    const shop = { ...payload, id };
    await db.collection(COLLECTION).doc(String(id)).set(shop);
    return shop;
  },

  async update(id, payload) {
    const ref = db.collection(COLLECTION).doc(String(id));
    const doc = await ref.get();
    if (!doc.exists) return null;
    await ref.set({ ...doc.data(), ...payload }, { merge: true });
    return (await ref.get()).data();
  },

  async delete(id) {
    const ref = db.collection(COLLECTION).doc(String(id));
    const doc = await ref.get();
    if (!doc.exists) return false;
    await ref.delete();
    return true;
  },
};

module.exports = shopsRepository;
