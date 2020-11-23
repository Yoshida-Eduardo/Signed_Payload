const jose = require('node-jose');
const fs = require('fs');
const { cert_to_x5c } = require('./utils/cert_to_x5c');

class KeyStore {
  constructor() {
    if (!KeyStore.instance) {
      this._keystore = jose.JWK.createKeyStore();
    }
  }

  async loadPrivateCert(path, fileFormat, certFormat = 'pem') {
    let file = fs.readFileSync(path, fileFormat);
    let props = {
      key_ops: 'sign'
    };
    let key = await this._keystore.add(file, certFormat, props);
    return key;
  }

  async loadPublicCert(path, fileFormat, certFormat = 'pem') {
    let file = fs.readFileSync(path, fileFormat);
    let props = {
      key_ops: 'verify',
      x5c: cert_to_x5c(file)
    };
    let key = await this._keystore.add(file, certFormat, props);
    return key;
  }

  async getFingerprint(key) {
    let fingerprint =  await key.thumbprint('SHA-1').then(function (print) {
      return jose.util.base64url.encode(print);
    });
    return fingerprint;
  }

  async sign(privateKey, publicKey, payload, format = 'utf-8') {
    let options = {
      fields: {
        x5t: await this.getFingerprint(publicKey),
        jku: 'localhost:3000/jwk',
        kid: publicKey.kid
      },
      alg: 'RS256',
      format: 'compact'
    }
    let signed = await jose.JWS.createSign(options, privateKey)
      .update(JSON.stringify(payload), format)
      .final();
    return signed;
  }

  getKeystore() {
    return this._keystore;
  }

  getPublicKeys() {
    let jwkset = this._keystore.toJSON();
    let publicKeys = [];
    publicKeys = jwkset.keys.filter(function(key) {
      return key.key_ops == 'verify'; 
    });
    return publicKeys;
  }
}



const keystore = new KeyStore();
Object.freeze(keystore);

module.exports = {
  keystore
};
