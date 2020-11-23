# Signed_Payload
Study repo for payload signing according to BACEN Pix dinamyc qr code requirements

To generate a public/private key pair run

```
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -outform pem -keyout certs/privateKey.key -out certs/certificate.crt
```

To start the application

```
npm start
```

Endpoints 
> POST /payload/

> GET /payload/:id

> GET /jwk

This was created just for JWS/JWK/JOSE study purposes