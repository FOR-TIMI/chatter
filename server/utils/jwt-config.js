const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    signToken: function({username,email,_id}){
        const payload = { username , email, _id};

        return jwt.sign({data:payload}, secret, {expiresIn: expiration});
    },
    authMiddleware: function(req, res, next) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
      
        // separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
          token = token
            .split(' ')
            .pop()
            .trim();
        }
      
        // if no token, return request object as is
        if (!token) {
          return res.status(403).send("Acess Denied")
        }
      
        try {
          // decode and attach user data to request object
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          req.user = data;
          next();

        } catch(err) {
          res.status(500).json({ error: err.message })
        }
      
        // return updated request object
        return req;
      }
}