const middleware = (req, res, next) => {
  const authKey = req.header("Authorization");

  if (authKey === "maCleDAutorisation") {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = middleware;
