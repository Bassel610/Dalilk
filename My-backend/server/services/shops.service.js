const shopsRepository = require('../repositories/shops.repository');
const filtersService = require('./filters.service');
const { HttpError } = require('../utils/http-error');
const shopMapper = require('../mappers/shop.mapper');

async function resolveLabels(filters = {}) {
  const [conservativeDoc, areaDoc, hayDoc, categoryDoc] = await Promise.all([
    filtersService.resolveSlug('conservatives', filters.conservative),
    filtersService.resolveSlug('areas', filters.area),
    filtersService.resolveSlug('hays', filters.hay),
    filtersService.resolveSlug('categories', filters.category),
  ]);

  // Auto-derive area from hay's areaKey if no area selected
  let effectiveAreaDoc = areaDoc;
  if (!effectiveAreaDoc && hayDoc?.areaKey) {
    effectiveAreaDoc = await filtersService.resolveSlug('areas', hayDoc.areaKey);
  }
  // Auto-derive conservative from area's conservativeKey if not set
  let effectiveConsDoc = conservativeDoc;
  if (!effectiveConsDoc && effectiveAreaDoc?.conservativeKey) {
    effectiveConsDoc = await filtersService.resolveSlug(
      'conservatives',
      effectiveAreaDoc.conservativeKey,
    );
  }

  return {
    conservativeLabel: effectiveConsDoc?.label,
    areaLabel: effectiveAreaDoc?.label,
    hayLabel: hayDoc?.label,
    categoryLabel: categoryDoc?.label,
    rate: filters.rate,
    search: filters.search,
  };
}

function shopMatches(shop, resolved) {
  if (resolved.conservativeLabel && shop?.AddressDetiles?.Conservative !== resolved.conservativeLabel) return false;
  if (resolved.areaLabel && shop?.AddressDetiles?.Area !== resolved.areaLabel) return false;
  if (resolved.hayLabel && shop?.AddressDetiles?.Hay !== resolved.hayLabel) return false;
  if (resolved.categoryLabel && !(shop.category || []).some((c) => c?.includes(resolved.categoryLabel))) return false;
  if (resolved.rate && String(shop.rate) !== String(resolved.rate)) return false;
  if (resolved.search && !(shop.Name || '').includes(resolved.search)) return false;
  return true;
}

const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 100;

const shopsService = {
  async list(filters = {}, paging = {}) {
    const [all, resolved] = await Promise.all([
      shopsRepository.findAll(),
      resolveLabels(filters),
    ]);
    const matched = all.filter((s) => shopMatches(s, resolved));

    const limit = Math.min(
      Math.max(Number(paging.limit) || DEFAULT_LIMIT, 1),
      MAX_LIMIT,
    );
    const offset = Math.max(Number(paging.offset) || 0, 0);
    const items = matched.slice(offset, offset + limit);

    return {
      items: shopMapper.listToApi(items),
      total: matched.length,
      limit,
      offset,
      hasMore: offset + items.length < matched.length,
    };
  },

  async findById(id) {
    const shop = await shopsRepository.findById(id);
    if (!shop) throw new HttpError(404, 'Shop not found', 'SHOP_NOT_FOUND');
    return shopMapper.toApi(shop);
  },

  async create(payload) {
    const shop = await shopsRepository.create(payload);
    return shopMapper.toApi(shop);
  },

  async update(id, payload) {
    const shop = await shopsRepository.update(id, payload);
    if (!shop) throw new HttpError(404, 'Shop not found', 'SHOP_NOT_FOUND');
    return shopMapper.toApi(shop);
  },

  async delete(id) {
    const ok = await shopsRepository.delete(id);
    if (!ok) throw new HttpError(404, 'Shop not found', 'SHOP_NOT_FOUND');
  },

  getFilterOptions: () => filtersService.getOptions(),
};

module.exports = shopsService;
