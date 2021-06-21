/**
 * @todo:
 * make lib to not depend on fixed env var names
 */
const path = require('path');

const fs = require('fs');

const errmsg = msg => `jwtCookie error: ${msg}`;

const th = msg => new Error(errmsg(msg));

/**
 * Script to use only on server, never import it to browser script
 */

if ( typeof process.env.JWT_SECRET !== 'string' ) {

    throw th(`jwtCookie.js: process.env.JWT_SECRET !== 'string'`);
}

if ( ! process.env.JWT_SECRET.trim() ) {

    throw th(`jwtCookie.js: process.env.JWT_SECRET is empty string`);
}

if ( typeof process.env.NEXT_PUBLIC_JWT_COOKIE_NAME !== 'string' ) {

    throw th(`jwtCookie.js: process.env.NEXT_PUBLIC_JWT_COOKIE_NAME !== 'string'`);
}

if ( ! process.env.NEXT_PUBLIC_JWT_COOKIE_NAME.trim() ) {

    throw th(`jwtCookie.js: process.env.NEXT_PUBLIC_JWT_COOKIE_NAME is empty string`);
}

if ( typeof process.env.NEXT_PUBLIC_JWT_EXPIRE_IN_SEC !== 'string' ) {

    throw th(`jwtCookie.js: process.env.NEXT_PUBLIC_JWT_EXPIRE_IN_SEC !== 'string'`);
}

if ( ! process.env.NEXT_PUBLIC_JWT_EXPIRE_IN_SEC.trim() ) {

    throw th(`jwtCookie.js: process.env.NEXT_PUBLIC_JWT_EXPIRE_IN_SEC is empty string`);
}

const NEXT_PUBLIC_JWT_EXPIRE_IN_SEC = parseInt(process.env.NEXT_PUBLIC_JWT_EXPIRE_IN_SEC, 10);

if ( NEXT_PUBLIC_JWT_EXPIRE_IN_SEC < 1 ) {

    throw th(`jwtCookie.js: NEXT_PUBLIC_JWT_EXPIRE_IN_SEC < 1`);
}

const jwt       = require('jsonwebtoken');

var Cookies     = require('cookies');

const tool = function (req, res) {

    var cookies = new Cookies(req, res);

    return {
        get: function () {

            return cookies.get(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME) || false;
        },
        /**
         * @param value - string value
         * @param expires - milisecond (+ or - if you want to delete) https://github.com/pillarjs/cookies#cookiesget-name--options--
         * @returns {tool}
         */
        set: function (value, opt = {}) {

            // console.log(`\n\nset cookie...\n\n`);

            cookies.set(opt.name || process.env.NEXT_PUBLIC_JWT_COOKIE_NAME, value, {
                expires: (function (k) {
                    k.setTime(k.getTime() + ( (opt.expire || NEXT_PUBLIC_JWT_EXPIRE_IN_SEC) * 1000))
                    return k;
                }(new Date())),
                httpOnly: false
            });

            return this;
        },
        setPayload: function (payload) {
            this.set(jwt.sign(
                {...payload},
                process.env.JWT_SECRET,
                {
                    // https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
                    // must be int
                    expiresIn: NEXT_PUBLIC_JWT_EXPIRE_IN_SEC,
                }
            ));
        },
        del: function () {
            return this.set('delete-this-cookie', {
                expire: - (24 * 60 * 60),
            } ) // -1 day
        },
        getVerified: function (delIfNotValid = true, log = true) {

            const cookieJWTTwoDotsToken = this.get();

            if ( ! cookieJWTTwoDotsToken || typeof cookieJWTTwoDotsToken !== 'string') {

                console && console.log && console.log(`api: req: '${req.url}', couldn't extract jwt token`);

                return false;
            }

            try {

                // expecting exception from method .verify() if not valid:
                // https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
                jwt.verify(cookieJWTTwoDotsToken, process.env.JWT_SECRET);

                return cookieJWTTwoDotsToken;
            }
            catch (e) { // auth based on cookie failed (any reason)

                console && console.log && console.log(`api: req: '${req.url}', invalid jwt token: '${e}'`);

                return false;
            }
        },
        getVerifiedPayload: function (delIfNotValid = true, log = true) {

            const cookieJWTTwoDotsToken = this.getVerified(delIfNotValid, log);

            if (cookieJWTTwoDotsToken) {

                return jwt.decode(cookieJWTTwoDotsToken);
            }
        },
        getVerifiedPayloadStripped: function (delIfNotValid = true, log = true) {

            const payload = this.getVerifiedPayload(delIfNotValid, log);

            try {

                delete payload.iat;

                delete payload.exp;
            }
            catch (e) {}

            return payload;
        }
    }
};

tool.token = {
    encode: function (payload = {}) {
        return jwt.sign(
          {payload},
          process.env.JWT_SECRET,
          {
              // https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
              // must be int
              expiresIn: NEXT_PUBLIC_JWT_EXPIRE_IN_SEC,
          }
        )
    },
    decode: function (rawToken) {

        if ( ! rawToken || typeof rawToken !== 'string' ) {

            console.log(errmsg(`rawToken is not a string`));

            return;
        }

        try {

            // expecting exception from method .verify() if not valid:
            // https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
            jwt.verify(rawToken, process.env.JWT_SECRET);

            const payload = jwt.decode(rawToken);

            try {

                return payload.payload;
            }
            catch (e) {}
        }
        catch (e) { // auth based on cookie failed (any reason)

            console.log(errmsg(`decoding error: ${e}`));

            return false;
        }
    },
};

module.exports = tool;

/**
 * @doc https://github.com/stopsopa/nlab#pregquote
 *
 * Logic based on https://www.npmjs.com/package/escape-string-regexp
 */
var matchOperatorsRe = /[|\\{}()[\]^$+*?.-]/g;

function pregQuote(str) {

    if (typeof str !== 'string') {

        return false;
    }

    return str.replace(matchOperatorsRe, '\\$&');
};

/*!
 * @doc https://github.com/stopsopa/nlab#trim
 * @version 1.0 - 2013-05-21
 * @author Szymon Działowski
 * direction : 'rl'|'r'|'l'   -->   (undefined => 'rl')
 * charlist  : (undefined => " \n")
 */
function trim(string, charlist, direction) {

    if (typeof string !== 'string') {

        return false;
    }

    direction = direction || 'rl';
    charlist  = pregQuote(charlist || '');
    charlist  = charlist || " \\n";
    (direction.indexOf('r')+1) && (string = string.replace(new RegExp('^(.*?)['+charlist+']*$','gm'),'$1'));
    (direction.indexOf('l')+1) && (string = string.replace(new RegExp('^['+charlist+']*(.*)$','gm'),'$1'));
    return string;
}