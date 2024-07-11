// const expressJwt = require('express-jwt');
const expressJwt = require('express-jwt');
require('dotenv').config();

function authJwt(){
    const secret = process.env.secret
    if (!secret) {
        throw new Error('Missing secret. Please set the secret environment variable.');
    }
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        // Is revoked is a function that will check the token(majorly the details in the token and give or revoke permission)
        isRevoked: isRevoked
    }).unless({
        path: [
            // {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            // {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            '/api/v1/login', '/api/v1/register'
            // `${api}/users`,
        ]
    });

    async function isRevoked(req, payload, done) {
        if(!payload.isAdmin) {
            done(null, true)
        }
    
        done();
    }
}


module.exports = authJwt;

