const middleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(errorEntry => {
        return { path: errorEntry.path, message: errorEntry.message }
      });
      res.status(400).json({ status: "fail", data: { error: message } });
    }
  }
}

export default middleware;