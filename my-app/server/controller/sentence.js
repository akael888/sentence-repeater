const { StatusCodes } = require("http-status-codes");

const getAllSentence = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "getAllSentence" });
};

const getSentence = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: `getSentence ${id}` });
};

const createSentence = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: `createSentence ${id}` });
};

const editSentence = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: `editSentence ${id}` });
};

const deleteSentece = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: `deleteSentece ${id}` });
};

module.exports = {
  getAllSentence,
  getSentence,
  createSentence,
  editSentence,
  deleteSentece,
};
