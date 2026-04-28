const { admin, db } = require('./firebase');

(async () => {
  try {
    const snap = await db.collection('users').get();
    if (snap.empty) {
      console.log('No users in Firestore.');
      process.exit(0);
    }
    const users = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
    const admins = users.filter((u) => u.role === 'admin');
    const regular = users.filter((u) => u.role !== 'admin');

    console.log(`\nTotal users: ${users.length}`);
    console.log(`Admins: ${admins.length}\n`);

    if (admins.length) {
      console.log('— Admin accounts —');
      admins.forEach((u) => console.log(`  • ${u.email}  (uid: ${u.uid})`));
    }
    if (regular.length) {
      console.log('\n— Regular users —');
      regular.forEach((u) => console.log(`  • ${u.email}  (role: ${u.role})`));
    }
    process.exit(0);
  } catch (err) {
    console.error('Failed:', err.message);
    process.exit(1);
  }
})();
