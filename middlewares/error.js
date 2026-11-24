function handleError(err, req, res, next) {
  console.error(err);
  return res.status(err.statusCode).send({ message: err.message });
}

module.exports = { handleError };
