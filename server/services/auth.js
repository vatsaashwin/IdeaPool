// MIDDLEWARE
var jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

exports.checkJWT = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true, // Default Value
        rateLimit: true,
        jwksRequestsPerMinute: 15,
        jwksUri: 'https://dev-ygcohjqk.auth0.com/.well-known/jwks.json'
    }),
    audience: 'lPRGHLCKHpe2045jEdqoShfCl8X50Kup',
    issuer: 'https://dev-ygcohjqk.auth0.com/',
    algorithms: ['RS256']
})