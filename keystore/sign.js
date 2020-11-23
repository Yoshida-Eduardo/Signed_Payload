const { keystore } = require('./index');
const path = require('path');

module.exports = {
  async sign (payload) {
    let privateKey = await keystore.loadPrivateCert(path.join(__dirname, '../certs/privateKey.key'), 'utf-8', 'pem');
    let publicKey = await keystore.loadPublicCert(path.join(__dirname, '../certs/certificate.crt'),'utf-8', 'pem');
  
    let signed = await keystore.sign(privateKey, publicKey, payload, 'utf-8');

    return signed;
  }
}