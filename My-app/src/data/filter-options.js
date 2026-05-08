export const SEED_FILTER_OPTIONS = {
  conservatives: [
    { key: 'cairo', label: 'القاهرة' },
    { key: 'giza', label: 'الجيزة' },
    { key: 'alex', label: 'الإسكندرية' },
  ],
  areasByConservative: {
    cairo: [
      { key: 'maadi', label: 'المعادي' },
      { key: 'downtown', label: 'وسط البلد' },
      { key: 'heliopolis', label: 'مصر الجديدة' },
      { key: 'ramses', label: 'رمسيس' },
    ],
    giza: [
      { key: 'dokki', label: 'الدقي' },
      { key: 'mohandseen', label: 'المهندسين' },
    ],
    alex: [{ key: 'manshia', label: 'المنشية' }],
  },
  haysByArea: {
    maadi: [{ key: 'gardens', label: 'حدائق المعادي' }],
    downtown: [{ key: 'tahrir', label: 'التحرير' }],
    heliopolis: [{ key: 'korba', label: 'الكوربة' }],
    ramses: [{ key: 'shaariya', label: 'باب الشعرية' }],
    dokki: [{ key: 'msaha', label: 'المساحة' }],
    manshia: [{ key: 'big_manshia', label: 'المنشية الكبرى' }],
  },
  categories: [
    { key: 'vegetables', label: 'خضاري' },
    { key: 'poultry', label: 'فرارجي' },
    { key: 'butchers', label: 'جزارين' },
    { key: 'herbs', label: 'عطارين' },
    { key: 'grocery', label: 'بقاله' },
    { key: 'restaurants', label: 'مطاعم' },
  ],
  rates: [
    { key: '1', label: '★' },
    { key: '2', label: '★★' },
    { key: '3', label: '★★★' },
    { key: '4', label: '★★★★' },
    { key: '5', label: '★★★★★' },
  ],
};
