function publicProfile(userDoc) {
  if (!userDoc) return null;
  return {
    uid: userDoc.uid,
    email: userDoc.email,
    role: userDoc.role || 'user',
    profile: userDoc.profile || {},
  };
}

function adminListItem(userDoc) {
  if (!userDoc) return null;
  return {
    uid: userDoc.uid,
    email: userDoc.email,
    role: userDoc.role || 'user',
    createdAt: userDoc.createdAt || null,
  };
}

module.exports = { publicProfile, adminListItem };
