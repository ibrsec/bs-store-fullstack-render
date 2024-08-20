"use strict";
module.exports = (req, res, next) => {
  const isAdmin = res.userDecoded?.isAdmin;
  if (!isAdmin) {
    res.status(403);
    throw new Error(
      "Forbidden - Category should be modified just by the admin user!"
    );
  }
  next();
};
