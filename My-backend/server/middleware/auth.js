const { admin, db } = require('../firebase');

async function verifyToken(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
        return res.status(401).json({ error: 'Missing token' });
    }
    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = { uid: decoded.uid, email: decoded.email };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

async function requireAdmin(req, res, next) {
    try {
        const doc = await db.collection('users').doc(req.user.uid).get();
        if (!doc.exists || doc.data().role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        req.user.role = 'admin';
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Auth check failed' });
    }
}

module.exports = { verifyToken, requireAdmin };
