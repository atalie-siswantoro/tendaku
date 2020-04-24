const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  // mendapatkan token dari headers
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    // jika ada token
    jwt.verify(token, "tendaku", (err, decoded) => {
      if (err) {
        // jika token tidak valid
        return res.status(401).json({
          message: "Token tidak valid"
        });
      } else {
        // jika valid
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // jika tidak
    return res.status(401).json({
      message: "Silahkan login terlebih dahulu"
    });
  }
}

module.exports = checkToken;