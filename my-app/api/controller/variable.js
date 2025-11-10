const { StatusCodes } = require("http-status-codes");
const Variable = require("../models/variable-model");
const {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const getAllVariables = async (req, res) => {
  const variable = await Variable.find({
    usedBySentence: req.params.sentenceId,
  }).sort("order");
  if (!variable) {
    throw new NotFoundError("Variable not Found");
  }
  res.status(StatusCodes.OK).json({ msg: "getAllVariables", variable });
};

const getVariable = async (req, res) => {
  const variable = await Variable.findOne({
    usedBySentence: req.params.sentenceId,
    _id: req.params.varId,
  });
  if (!variable) {
    throw new NotFoundError(`Variable (${req.params.varId}) not Found`);
  }
  res.status(StatusCodes.OK).json({ msg: "getVariable", variable });
};

const createVariable = async (req, res) => {
  req.body.usedBySentence = req.params.sentenceId;
  const { _id } = req.body;
  if (_id) {
    req.body._id = null;
  }
  const variable = await Variable.create(req.body);
  res
    .status(StatusCodes.OK)
    .json({ msg: `createVariable ${req.params.id}`, variable });
};

const deleteVariable = async (req, res) => {
  const variable = await Variable.findOneAndDelete({
    _id: req.params.varId,
  });

  if (!variable) {
    throw new NotFoundError(`Variable (${req.params.varId}) not Found`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: `Deleted this variable ${req.params.varId}`, variable });
};

module.exports = {
  getAllVariables,
  getVariable,
  createVariable,
  deleteVariable,
};
