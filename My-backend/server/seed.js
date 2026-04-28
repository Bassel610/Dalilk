const { db } = require('./firebase');

// ── Filter lookup tables (live in Firestore) ──

const CONSERVATIVES = [
  { id: 1, key: 'giza', label: 'الجيزة' },
  { id: 2, key: 'cairo', label: 'القاهرة' },
];

const AREAS = [
  { id: 1, key: 'october', label: 'اكتوبر', conservativeKey: 'giza' },
  { id: 2, key: 'sheikh-zayed', label: 'الشيخ زايد', conservativeKey: 'giza' },
  { id: 3, key: 'dokki', label: 'الدقي', conservativeKey: 'giza' },
  { id: 4, key: 'nasr-city', label: 'مدينة نصر', conservativeKey: 'cairo' },
  { id: 5, key: 'heliopolis', label: 'مصر الجديدة', conservativeKey: 'cairo' },
  { id: 6, key: 'maadi', label: 'المعادي', conservativeKey: 'cairo' },
];

const HAYS = [
  { id: 1, key: 'october_h1', label: 'الحي الأول', areaKey: 'october' },
  { id: 2, key: 'october_h2', label: 'الحي الثاني', areaKey: 'october' },
  { id: 3, key: 'october_h5', label: 'الحي الخامس', areaKey: 'october' },
  { id: 4, key: 'sheikh-zayed_h1', label: 'الحي الأول', areaKey: 'sheikh-zayed' },
  { id: 5, key: 'sheikh-zayed_h2', label: 'الحي الثاني', areaKey: 'sheikh-zayed' },
  { id: 6, key: 'sheikh-zayed_h3', label: 'الحي الثالث', areaKey: 'sheikh-zayed' },
  { id: 7, key: 'dokki_h1', label: 'الحي الأول', areaKey: 'dokki' },
  { id: 8, key: 'dokki_h2', label: 'الحي الثاني', areaKey: 'dokki' },
  { id: 9, key: 'nasr-city_h6', label: 'الحي السادس', areaKey: 'nasr-city' },
  { id: 10, key: 'nasr-city_h7', label: 'الحي السابع', areaKey: 'nasr-city' },
  { id: 11, key: 'nasr-city_h8', label: 'الحي الثامن', areaKey: 'nasr-city' },
  { id: 12, key: 'heliopolis_corba', label: 'الكوربة', areaKey: 'heliopolis' },
  { id: 13, key: 'heliopolis_roxy', label: 'روكسي', areaKey: 'heliopolis' },
  { id: 14, key: 'maadi_digla', label: 'دجلة', areaKey: 'maadi' },
  { id: 15, key: 'maadi_new', label: 'المعادي الجديدة', areaKey: 'maadi' },
];

const CATEGORIES = [
  { id: 1, key: 'grocery', label: 'بقاله' },
  { id: 2, key: 'vegetables', label: 'خضاري' },
  { id: 3, key: 'veggies', label: 'خضار' },
  { id: 4, key: 'poultry', label: 'فرارجي' },
  { id: 5, key: 'butchers', label: 'جزارين' },
  { id: 6, key: 'herbs', label: 'عطارين' },
  { id: 7, key: 'restaurants', label: 'مطاعم' },
];

// ── Sample shops ──

const SHOPS = [
  { id: 1, Name: 'سوبر ماركت النور', LandMark: 'بجوار مسجد النور', rate: '4',
    category: ['بقاله', 'خضار'],
    Address: ['شارع 9, اكتوبر, الجيزة'],
    location: ['https://maps.app.goo.gl/example1'],
    AddressDetiles: { Conservative: 'الجيزة', Area: 'اكتوبر', Hay: 'الحي الأول' } },
  { id: 2, Name: 'فرارجي السلام', LandMark: 'محطة المترو', rate: '3',
    category: ['فرارجي'],
    Address: ['شارع 26, اكتوبر, الجيزة'],
    location: ['https://maps.app.goo.gl/example2'],
    AddressDetiles: { Conservative: 'الجيزة', Area: 'اكتوبر', Hay: 'الحي الثاني' } },
  { id: 3, Name: 'مطعم بيت الكبدة', LandMark: 'أمام السنترال', rate: '5',
    category: ['مطاعم'],
    Address: ['الحي الخامس, اكتوبر, الجيزة'],
    location: ['https://maps.app.goo.gl/example3'],
    AddressDetiles: { Conservative: 'الجيزة', Area: 'اكتوبر', Hay: 'الحي الخامس' } },
  { id: 4, Name: 'مطعم الشام', LandMark: 'أمام المول', rate: '5',
    category: ['مطاعم'],
    Address: ['الحي الثاني, الشيخ زايد, الجيزة'],
    location: ['https://maps.app.goo.gl/example4'],
    AddressDetiles: { Conservative: 'الجيزة', Area: 'الشيخ زايد', Hay: 'الحي الثاني' } },
  { id: 5, Name: 'جزارة الإخلاص', LandMark: 'مدخل الكمبوند', rate: '4',
    category: ['جزارين'],
    Address: ['الحي الأول, الشيخ زايد, الجيزة'],
    location: ['https://maps.app.goo.gl/example5'],
    AddressDetiles: { Conservative: 'الجيزة', Area: 'الشيخ زايد', Hay: 'الحي الأول' } },
  { id: 6, Name: 'بقالة العائلة', LandMark: 'شارع المدارس', rate: '4',
    category: ['بقاله'],
    Address: ['الحي الثالث, الشيخ زايد, الجيزة'],
    location: ['https://maps.app.goo.gl/example6'],
    AddressDetiles: { Conservative: 'الجيزة', Area: 'الشيخ زايد', Hay: 'الحي الثالث' } },
  { id: 7, Name: 'عطار الحكيم', LandMark: 'وسط السوق', rate: '5',
    category: ['عطارين'],
    Address: ['شارع الجمهورية, الدقي, الجيزة'],
    location: ['https://maps.app.goo.gl/example7'],
    AddressDetiles: { Conservative: 'الجيزة', Area: 'الدقي', Hay: 'الحي الأول' } },
  { id: 8, Name: 'خضاري ابو حسن', LandMark: 'سوق الخضار', rate: '4',
    category: ['خضاري'],
    Address: ['شارع التحرير, الدقي, الجيزة'],
    location: ['https://maps.app.goo.gl/example8'],
    AddressDetiles: { Conservative: 'الجيزة', Area: 'الدقي', Hay: 'الحي الثاني' } },
  { id: 9, Name: 'جزارة الأمانة', LandMark: 'بجوار البنك الأهلي', rate: '4',
    category: ['جزارين'],
    Address: ['شارع التحرير, مدينة نصر, القاهرة'],
    location: ['https://maps.app.goo.gl/example9'],
    AddressDetiles: { Conservative: 'القاهرة', Area: 'مدينة نصر', Hay: 'الحي السابع' } },
  { id: 10, Name: 'فرارجي السعد', LandMark: 'محطة الأتوبيس', rate: '3',
    category: ['فرارجي'],
    Address: ['شارع عباس العقاد, مدينة نصر, القاهرة'],
    location: ['https://maps.app.goo.gl/example10'],
    AddressDetiles: { Conservative: 'القاهرة', Area: 'مدينة نصر', Hay: 'الحي السادس' } },
  { id: 11, Name: 'مطعم القاهرة', LandMark: 'كافيتيريا الجامعة', rate: '5',
    category: ['مطاعم'],
    Address: ['شارع مكرم عبيد, مدينة نصر, القاهرة'],
    location: ['https://maps.app.goo.gl/example11'],
    AddressDetiles: { Conservative: 'القاهرة', Area: 'مدينة نصر', Hay: 'الحي الثامن' } },
  { id: 12, Name: 'سوبر ماركت كازيون', LandMark: 'مول السراج', rate: '5',
    category: ['بقاله', 'خضار'],
    Address: ['طريق النصر, مدينة نصر, القاهرة'],
    location: ['https://maps.app.goo.gl/example12'],
    AddressDetiles: { Conservative: 'القاهرة', Area: 'مدينة نصر', Hay: 'الحي السابع' } },
  { id: 13, Name: 'مطعم بيت العائلة', LandMark: 'كنيسة العذراء', rate: '4',
    category: ['مطاعم'],
    Address: ['شارع الحجاز, مصر الجديدة, القاهرة'],
    location: ['https://maps.app.goo.gl/example13'],
    AddressDetiles: { Conservative: 'القاهرة', Area: 'مصر الجديدة', Hay: 'الكوربة' } },
  { id: 14, Name: 'عطار الشفاء', LandMark: 'صيدلية العزبي', rate: '5',
    category: ['عطارين'],
    Address: ['شارع الميرغني, مصر الجديدة, القاهرة'],
    location: ['https://maps.app.goo.gl/example14'],
    AddressDetiles: { Conservative: 'القاهرة', Area: 'مصر الجديدة', Hay: 'الكوربة' } },
  { id: 15, Name: 'خضاري الجمعية', LandMark: 'سوق الجمعة', rate: '4',
    category: ['خضاري', 'بقاله'],
    Address: ['شارع روكسي, مصر الجديدة, القاهرة'],
    location: ['https://maps.app.goo.gl/example15'],
    AddressDetiles: { Conservative: 'القاهرة', Area: 'مصر الجديدة', Hay: 'روكسي' } },
  { id: 16, Name: 'مطعم لوسيل', LandMark: 'كافيه السان مارك', rate: '5',
    category: ['مطاعم'],
    Address: ['شارع 9, المعادي, القاهرة'],
    location: ['https://maps.app.goo.gl/example16'],
    AddressDetiles: { Conservative: 'القاهرة', Area: 'المعادي', Hay: 'دجلة' } },
  { id: 17, Name: 'سوبر ماركت سعودي', LandMark: 'بجوار البنزينة', rate: '4',
    category: ['بقاله', 'خضار'],
    Address: ['شارع 11, المعادي, القاهرة'],
    location: ['https://maps.app.goo.gl/example17'],
    AddressDetiles: { Conservative: 'القاهرة', Area: 'المعادي', Hay: 'المعادي الجديدة' } },
];

// ── Helpers ──

async function clearCollection(name) {
  const snap = await db.collection(name).get();
  if (snap.empty) return;
  const batch = db.batch();
  snap.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}

async function seedCollection(name, items, idField = 'key') {
  const batch = db.batch();
  items.forEach((item) => {
    batch.set(db.collection(name).doc(String(item[idField])), item);
  });
  await batch.commit();
}

// ── Run ──

async function seed() {
  const targets = [
    ['conservatives', CONSERVATIVES, 'key'],
    ['areas', AREAS, 'key'],
    ['hays', HAYS, 'key'],
    ['categories', CATEGORIES, 'key'],
    ['allShops', SHOPS, 'id'],
  ];

  for (const [name, items, idField] of targets) {
    console.log(`Clearing ${name}…`);
    await clearCollection(name);
    console.log(`Seeding ${name}…`);
    await seedCollection(name, items, idField);
    console.log(`✓ ${name}: ${items.length} docs`);
  }

  console.log('\nDone.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
