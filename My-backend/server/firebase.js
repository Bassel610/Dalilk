const path = require('path');
const admin = require('firebase-admin');
const config = require('./config');

const accountPath = path.isAbsolute(config.firebase.serviceAccountPath)
  ? config.firebase.serviceAccountPath
  : path.join(__dirname, config.firebase.serviceAccountPath);

const serviceAccount = require(accountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

module.exports = { admin, db };
