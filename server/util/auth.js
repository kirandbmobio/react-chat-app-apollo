const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.json");

exports.authenticateUser = async (context) => {
  if (context.request.headers.authorization) {
    let token = context.request.headers.authorization.split("Bearer ")[1];
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // return true;
      }

      context.user = decodedToken;
    });
  }
};
