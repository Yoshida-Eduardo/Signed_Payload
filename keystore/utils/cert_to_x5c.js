module.exports = {
  cert_to_x5c: (cert, maxdepth) => {
    if (maxdepth == null) {
      maxdepth = 0;
    }

    cert = cert.replace(/-----[^\n]+\n?/gm, ',').replace(/\n/g, '');
    cert = cert.split(',').filter(function (c) {
      return c.length > 0;
    });
    if (maxdepth > 0) {
      cert = cert.splice(0, maxdepth);
    }
    return cert;
  }
};
