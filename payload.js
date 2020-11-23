const { v4: uuid } = require('uuid');
const { sign } = require('./keystore/sign');
const { keystore } = require('./keystore');

module.exports = {
  async overwriteRender(req, res) {
    if (req.url === '/payload' && res.statusCode === 201 && req.method === 'POST') {
        res.jsonp({url: `localhost:3000/${res.locals.data.id}`});
    } else if (req.method == 'GET' && /.payload*/.test(req.url)) {
        let signed = await sign(res.locals.data);
        res.send(await sign(res.locals.data));
    } else {
      res.send(res.locals.data);
    }
  },
  async getJwkset(req, res) {
    res.jsonp(keystore.getPublicKeys());
  }
}