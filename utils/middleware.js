const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  
  if (!token) {
    if (req.originalUrl === "/user/log") {
      return next(); 
    }
    return res.redirect("/user/log");
  }

  try {
    const decoded = jwt.verify(token, "Truck");
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT verification failed:", err.message);
    res.clearCookie("token");
    
    if (req.originalUrl === "/user/log") {
      return next();
    }

    return res.redirect("/user/log");
  }
};
