generateAlphaNumeric = function(length,cb) {
  let alpanumeric = '0123456789abcdefghijklmnopqrstuvwxyz'
  var result = '';
  for (var i = length; i > 0; --i) result += alpanumeric[Math.round(Math.random() * (alpanumeric.length - 1))];
  return cb(result);
}

module.exports = generateAlphaNumeric
