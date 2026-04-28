// Shops are stored with the legacy schema (Arabic label fields, "AddressDetiles" typo).
// Mapper kept as identity for now to stay backward compatible with the frontend.
// When the frontend migrates to a clean shape, transform here.
function toApi(shop) {
  if (!shop) return null;
  return shop;
}

function listToApi(shops) {
  return (shops || []).map(toApi);
}

module.exports = { toApi, listToApi };
