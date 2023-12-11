const validationTypes = ["body", "params", "query"];

export default (schema) => {
  return (req, res, next) => {
    const errors = {};

    validationTypes.forEach(type => {
      if (schema[type]) {
        const { error } = schema[type].validate(req[type], { abortEarly: false });
        if (error) {
          errors[type] = error.details.map(errorEntry => {
            return { path: errorEntry.path, message: errorEntry.message };
          });
        }
      }
    });

    if (Object.keys(errors).length === 0) {
      next();
    } else {
      res.status(400).json({ status: "fail", data: { error: errors } });
    }
  };
};
