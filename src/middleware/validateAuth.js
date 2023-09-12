const authSchema = require("../dto/createUser");
const validateauth = async (req, res, next) => {
  try {
    await authSchema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    throw res.status(401);
  }
};
module.exports = validateauth;
