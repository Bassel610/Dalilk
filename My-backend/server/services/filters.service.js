const filtersRepository = require('../repositories/filters.repository');
const { buildFilterOptions, lookupBySlug } = require('../mappers/filter.mapper');

const filtersService = {
  async getOptions() {
    const docs = await filtersRepository.getAll();
    return buildFilterOptions(docs);
  },

  async resolveSlug(kind, slug) {
    if (!slug) return null;
    const docs = await filtersRepository.getAll();
    const list = docs[kind] || [];
    return lookupBySlug(list, slug);
  },

  invalidateCache: () => filtersRepository.invalidate(),
};

module.exports = filtersService;
