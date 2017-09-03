var jwt = require('jsonwebtoken');

var secret = process.env.SECRET_TOKEN_KEY

const decode = (token,cb) => {
  jwt.verify(token, secret, (err,decoded)=>{
    cb(err,decoded)
  })
}

const login = (payload,cb)=>{
  var token = jwt.sign(payload, secret, { expiresIn: '1h' });
  cb(token)
}

const loginCheck = (req,res,next)=>{
  jwt.verify(req.headers.token, secret, (err,decoded)=>{
    if(err !== null){
      res.json({error: 'belum login'})
    } else {
      next()
    }
  })
}


module.exports = {
  decode,
  loginCheck,
  login
}
