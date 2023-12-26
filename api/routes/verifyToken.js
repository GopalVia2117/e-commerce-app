const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
   const authHeader = req.headers.token;

   console.log(req.headers.token);
   console.log(req.originalUrl);

   
  if (authHeader) {
    // const token = authHeader.split(" ")[1];

    const token = authHeader;

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && (req.user._id === req.body.userId || req.user._id === req.params.id || req.user.isAdmin)) {
      console.log(req.user);
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
