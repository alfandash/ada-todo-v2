const crypto = require('crypto');

convertPass = function (obj,cb){
  var hash = crypto.createHmac('sha256', `${obj.secret}`)
  .update(`${obj.pass}`)
  .digest('hex');
  return cb(hash);
}

module.exports = convertPass
