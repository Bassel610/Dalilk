const https = require('https');
const { admin } = require('./firebase');

async function enableEmailPasswordAuth() {
  const projectId = admin.app().options.credential.projectId
    || admin.app().options.projectId;

  const tokenResp = await admin.app().options.credential.getAccessToken();
  const accessToken = tokenResp.access_token;

  const body = JSON.stringify({
    signIn: {
      email: { enabled: true, passwordRequired: true },
    },
  });

  const path = `/admin/v2/projects/${projectId}/config?updateMask=signIn.email.enabled,signIn.email.passwordRequired`;

  const options = {
    hostname: 'identitytoolkit.googleapis.com',
    path,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, body: data });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

enableEmailPasswordAuth()
  .then((res) => {
    console.log('✓ Email/Password auth enabled');
    const parsed = JSON.parse(res.body);
    console.log('signIn.email:', JSON.stringify(parsed.signIn?.email, null, 2));
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed:', err.message);
    process.exit(1);
  });
