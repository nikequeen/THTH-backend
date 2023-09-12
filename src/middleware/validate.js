const yupValidator = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        return next();
    } catch (error) {
        return res.status(400).json({ success: false, message: error.errors[0]});
    }
};

module.exports = yupValidator;
