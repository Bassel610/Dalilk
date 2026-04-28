const { db } = require('../firebase');
const config = require('../config');

let cache = null;
let cachedAt = 0;

async function loadAll() {
  const [cons, areas, hays, cats] = await Promise.all([
    db.collection('conservatives').get(),
    db.collection('areas').get(),
    db.collection('hays').get(),
    db.collection('categories').get(),
  ]);
  return {
    conservatives: cons.docs.map((d) => d.data()),
    areas: areas.docs.map((d) => d.data()),
    hays: hays.docs.map((d) => d.data()),
    categories: cats.docs.map((d) => d.data()),
  };
}

const filtersRepository = {
  async getAll() {
    const now = Date.now();
    if (!cache || now - cachedAt > config.filterOptionsTtlMs) {
      cache = await loadAll();
      cachedAt = now;
    }
    return cache;
  },

  invalidate() {
    cache = null;
  },
};

module.exports = filtersRepository;
