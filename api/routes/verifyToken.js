const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(401).json("Token is invalid");
      req.user = user;
      console.log(user);
      next();
    });
  } else {
    return res.status(401).json("Not authorized");
  }
};

const verifyTokenAndAuthorized = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You do not have permission to access this");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You do not have permission to access this");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorized, verifyTokenAndAdmin };
