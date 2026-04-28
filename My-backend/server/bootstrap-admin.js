const { admin, db } = require('./firebase');

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
    console.error('Usage: node bootstrap-admin.js <email> <password>');
    process.exit(1);
}

(async () => {
    try {
        let userRecord;
        try {
            userRecord = await admin.auth().getUserByEmail(email);
            console.log(`User exists: ${userRecord.uid}. Updating password.`);
            await admin.auth().updateUser(userRecord.uid, { password });
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                userRecord = await admin.auth().createUser({ email, password });
                console.log(`Created new user: ${userRecord.uid}`);
            } else {
                throw err;
            }
        }
        await db.collection('users').doc(userRecord.uid).set({
            email,
            role: 'admin',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
        console.log(`Admin set: ${email} (uid=${userRecord.uid})`);
        process.exit(0);
    } catch (err) {
        console.error('Bootstrap failed:', err);
        process.exit(1);
    }
})();
