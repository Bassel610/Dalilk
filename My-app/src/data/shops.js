const LOCATIONS = {
  maadi: {
    Conservative: 'القاهرة',
    Area: 'المعادي',
    Hay: 'حدائق المعادي',
    streets: ['شارع 9', 'شارع 233', 'شارع النصر', 'كورنيش المعادي', 'شارع 105'],
    base: [29.9626, 31.2497],
  },
  downtown: {
    Conservative: 'القاهرة',
    Area: 'وسط البلد',
    Hay: 'التحرير',
    streets: ['شارع طلعت حرب', 'شارع قصر النيل', 'ميدان التحرير', 'شارع 26 يوليو', 'شارع شريف'],
    base: [30.0444, 31.2357],
  },
  heliopolis: {
    Conservative: 'القاهرة',
    Area: 'مصر الجديدة',
    Hay: 'الكوربة',
    streets: ['شارع بغداد', 'شارع العروبة', 'ميدان روكسي', 'شارع كليوباترا', 'شارع الأهرام'],
    base: [30.0921, 31.3219],
  },
  ramses: {
    Conservative: 'القاهرة',
    Area: 'رمسيس',
    Hay: 'باب الشعرية',
    streets: ['شارع رمسيس', 'ميدان رمسيس', 'شارع الجلاء', 'شارع الجيش', 'شارع باب الشعرية'],
    base: [30.0626, 31.2461],
  },
  dokki: {
    Conservative: 'الجيزة',
    Area: 'الدقي',
    Hay: 'المساحة',
    streets: ['شارع التحرير', 'ميدان الدقي', 'شارع المساحة', 'شارع نادي الصيد', 'شارع وزارة الزراعة'],
    base: [30.0382, 31.2122],
  },
  manshia: {
    Conservative: 'الإسكندرية',
    Area: 'المنشية',
    Hay: 'المنشية الكبرى',
    streets: ['ميدان المنشية', 'شارع صفية زغلول', 'شارع فؤاد', 'شارع النبي دانيال', 'كورنيش الإسكندرية'],
    base: [31.1995, 29.8964],
  },
};

const RAW = [
  { cat: 'بقاله', name: 'كارفور المعادي', loc: 'maadi' },
  { cat: 'بقاله', name: 'هايبر وان مول مصر', loc: 'dokki' },
  { cat: 'بقاله', name: 'مترو ماركت طلعت حرب', loc: 'downtown' },
  { cat: 'بقاله', name: 'سعودي ماركت روكسي', loc: 'heliopolis' },
  { cat: 'بقاله', name: 'أولاد رجب الدقي', loc: 'dokki' },
  { cat: 'بقاله', name: 'خير زمان المنشية', loc: 'manshia' },
  { cat: 'بقاله', name: 'سيف ماركت رمسيس', loc: 'ramses' },
  { cat: 'بقاله', name: 'بقالة الأمين', loc: 'maadi' },
  { cat: 'بقاله', name: 'زاد ماركت الكوربة', loc: 'heliopolis' },
  { cat: 'بقاله', name: 'بقالة الحاج كمال', loc: 'downtown' },

  { cat: 'مطاعم', name: 'كشري أبو طارق', loc: 'downtown' },
  { cat: 'مطاعم', name: 'مطعم حضرموت', loc: 'maadi' },
  { cat: 'مطاعم', name: 'كازينو روكسي', loc: 'heliopolis' },
  { cat: 'مطاعم', name: 'جاد المهندسين فرع الدقي', loc: 'dokki' },
  { cat: 'مطاعم', name: 'فول محمد أحمد', loc: 'manshia' },
  { cat: 'مطاعم', name: 'الكبابجي رمسيس', loc: 'ramses' },
  { cat: 'مطاعم', name: 'مطعم أبو حيدر', loc: 'dokki' },
  { cat: 'مطاعم', name: 'فطاطري الكوربة', loc: 'heliopolis' },
  { cat: 'مطاعم', name: 'مطعم السلطان حسن', loc: 'downtown' },
  { cat: 'مطاعم', name: 'كشري التحرير', loc: 'downtown' },

  { cat: 'جزارين', name: 'جزارة الأمين', loc: 'maadi' },
  { cat: 'جزارين', name: 'جزارة محمد علي', loc: 'downtown' },
  { cat: 'جزارين', name: 'جزارة العمدة الكوربة', loc: 'heliopolis' },
  { cat: 'جزارين', name: 'جزارة البركة باب الشعرية', loc: 'ramses' },
  { cat: 'جزارين', name: 'جزارة الإيمان الدقي', loc: 'dokki' },
  { cat: 'جزارين', name: 'جزارة المنشية', loc: 'manshia' },
  { cat: 'جزارين', name: 'لحوم النيل', loc: 'maadi' },
  { cat: 'جزارين', name: 'جزارة الفجر الجديدة', loc: 'heliopolis' },
  { cat: 'جزارين', name: 'لحوم القاهرة الكبرى', loc: 'dokki' },
  { cat: 'جزارين', name: 'جزارة الفقي', loc: 'manshia' },

  { cat: 'خضاري', name: 'سوق التوفيقية', loc: 'downtown' },
  { cat: 'خضاري', name: 'خضار وفاكهة العتبة', loc: 'ramses' },
  { cat: 'خضاري', name: 'خضار البحر روكسي', loc: 'heliopolis' },
  { cat: 'خضاري', name: 'خضار الطلوني', loc: 'downtown' },
  { cat: 'خضاري', name: 'خضار شارع 9', loc: 'maadi' },
  { cat: 'خضاري', name: 'سوق الدقي للخضار', loc: 'dokki' },
  { cat: 'خضاري', name: 'فاكهة المنشية', loc: 'manshia' },
  { cat: 'خضاري', name: 'خضار باب الشعرية', loc: 'ramses' },
  { cat: 'خضاري', name: 'سوق الخضار المركزي', loc: 'dokki' },
  { cat: 'خضاري', name: 'خضار البلد', loc: 'maadi' },

  { cat: 'فرارجي', name: 'فرارجي الوادي', loc: 'maadi' },
  { cat: 'فرارجي', name: 'دجاج الفقي روكسي', loc: 'heliopolis' },
  { cat: 'فرارجي', name: 'فرارجي المعادي البلدي', loc: 'maadi' },
  { cat: 'فرارجي', name: 'الدواجن المصرية', loc: 'dokki' },
  { cat: 'فرارجي', name: 'دواجن الوسطى', loc: 'downtown' },
  { cat: 'فرارجي', name: 'فرارجي ميدان لبنان', loc: 'dokki' },
  { cat: 'فرارجي', name: 'دواجن المنشية', loc: 'manshia' },
  { cat: 'فرارجي', name: 'فرارجي الكوربة', loc: 'heliopolis' },
  { cat: 'فرارجي', name: 'دواجن الأمين رمسيس', loc: 'ramses' },
  { cat: 'فرارجي', name: 'فرارجي طلعت حرب', loc: 'downtown' },

  { cat: 'عطارين', name: 'عطارة هارون', loc: 'downtown' },
  { cat: 'عطارين', name: 'عطار العتبة', loc: 'ramses' },
  { cat: 'عطارين', name: 'عطارة الإسكندرية', loc: 'manshia' },
  { cat: 'عطارين', name: 'عطارة الشعراني الكوربة', loc: 'heliopolis' },
  { cat: 'عطارين', name: 'عطارة المعادي', loc: 'maadi' },
  { cat: 'عطارين', name: 'عطار الصحة الدقي', loc: 'dokki' },
  { cat: 'عطارين', name: 'عطار الشفاء', loc: 'maadi' },
  { cat: 'عطارين', name: 'عطارة الحكمة', loc: 'heliopolis' },
  { cat: 'عطارين', name: 'عطار النور', loc: 'dokki' },
  { cat: 'عطارين', name: 'عطارة البركة', loc: 'ramses' },
];

const LANDMARKS = [
  'بجوار محطة المترو',
  'أمام صيدلية العزبي',
  'بجوار البنك الأهلي',
  'أمام كنتاكي',
  'بجوار محطة الوقود',
  'أمام مدرسة الراهبات',
  'بجوار مستشفى السلام',
  'أمام كوبري الجلاء',
  'بجوار النادي الأهلي',
  'أمام جامع الحسين',
];

function jitter(n, i, scale = 0.012) {
  return Number((n + ((i % 7) - 3) * scale).toFixed(6));
}

function mapsUrl(lat, lng) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export const SEED_SHOPS = RAW.map((r, i) => {
  const loc = LOCATIONS[r.loc];
  const street = loc.streets[i % loc.streets.length];
  const lat = jitter(loc.base[0], i);
  const lng = jitter(loc.base[1], i + 3);
  const rate = String(3 + (i % 3));
  return {
    id: `seed_shop_${i + 1}`,
    Name: r.name,
    LandMark: LANDMARKS[i % LANDMARKS.length],
    rate,
    category: [r.cat],
    Address: [`${street}، ${loc.Area}، ${loc.Conservative}`],
    location: [mapsUrl(lat, lng)],
    AddressDetiles: {
      Conservative: loc.Conservative,
      Area: loc.Area,
      Hay: loc.Hay,
    },
  };
});
