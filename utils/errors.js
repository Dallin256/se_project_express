function err500(res) {
  return res
    .status(500)
    .send({ message: "An error has occurred on the server" });
}

function err400(res) {
  return res.status(400).send({ message: "ERROR! Invalid input data!" });
}

function err404(res, item) {
  return res.status(404).send({ message: `ERROR! ${item} Not Found!` });
}

module.exports = { err500, err400, err404 };
