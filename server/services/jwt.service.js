const jwt = require("jsonwebtoken");
const config = require("../datasources/config.json");
// const redis = require("redis");
const uuidv4 = require('uuid/v4');

module.exports = {
  sign
};

// const redisClient = redis.createClient();

function sign(id, payload) {
  const uuid = uuidv4();

  if (Array.isArray(payload)) {
    payload = payload.reduce(function(obj, cur, i) {
      obj[i] = cur;
      return obj;
    }, {});
  }
  const token = jwt.sign(payload, config.secret, {
    algorithm: 'HS256',
    expiresIn: '15minutes',
    jwtid: uuid
  });

  // redisClient.set(id, uuid);

  return token;
}