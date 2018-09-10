const expressJwt = require("express-jwt");
const config = require("../datasources/config.json");
// const redis = require("redis");

// const redisClient = redis.createClient();

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: ["/auth/authenticate", "/auth/register"]
  });
}

async function isRevoked(req, payload, done) {
  // await redisClient.get(payload.uid, (err, val) => {
  //   if (!err && payload.jti === val) {
      done();
    // }
    // done(null, true);
  // });
}

module.exports = jwt;
