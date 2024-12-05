const jwt = require('jsonwebtoken')
const checkUser = (req, res, next)=>{
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    if(req.user.role == "user"){
        next();
    }else{
        return res.status(401).json({msg: "users only"})
    }
  });
}

module.exports = checkUser;