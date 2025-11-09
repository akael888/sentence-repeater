const { StatusCodes } = require("http-status-codes");
const Sentence = require("../models/sentence-model");
const Variable = require("../models/variable-model");
const {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const getAllSentence = async (req, res) => {
  const sentence = await Sentence.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );

  if (!sentence) {
    throw new NotFoundError("No Sentence Found");
  }
  res.status(StatusCodes.OK).json({ sentence, sentenceCount: sentence.length });
};

const getSentence = async (req, res) => {
  const sentence = await Sentence.find({
    createdBy: req.user.userId,
    _id: req.params.id,
  }).sort("createdAt");

  if (!sentence) {
    throw new NotFoundError(`No Sentence Found with this ID: ${id}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: `Found this ${req.params.id} sentence`, sentence });
};

const createSentence = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const sentence = await Sentence.create(req.body);
  res.status(StatusCodes.OK).json({ msg: `New Sentence Created!`, sentence });
};

const editSentence = async (req, res) => {
  const sentence = await Sentence.findOneAndUpdate(
    {
      createdBy: req.user.userId,
      _id: req.params.id,
    },
    req.body,
    { new: true }
  );

  if (!sentence) {
    throw new NotFoundError(`No Sentence Found with this ID: ${id}`);
  }

  const { variables } = req.body;
  console.log(variables);

  if (variables) {
    const variableIds = variables.filter((v) => v._id).map((v) => v._id);

    await Variable.deleteMany({
      usedBySentence: req.params.id,
      _id: { $nin: variableIds },
    });

    const updatedOps = variables.map((v) => {
      const hasId = Boolean(v._id);

      return hasId
        ? {
            updateOne: {
              filter: { _id: v._id, usedBySentence: req.params.id },
              update: { $set: v },
              upsert: false,
            },
          }
        : {
            insertOne: {
              document: { ...v, usedBySentence: req.params.id },
            },
          };
    });

    const variable = await Variable.bulkWrite(updatedOps);
  }

  res.status(StatusCodes.OK).json({
    msg: `${req.params.id} Sentence Edited!`,
    subMsg: variables
      ? `Variable fields that is changed: ${Object.keys(variables).join(",")}`
      : "no variablies changed",
    sentence,
  });
};

const deleteSentece = async (req, res) => {
  const sentence = await Sentence.findOneAndDelete({
    createdBy: req.user.userId,
    _id: req.params.id,
  });
  const variable = await Variable.deleteMany({ usedBySentence: req.params.id });

  if (!sentence) {
    throw new NotFoundError(`No Sentence Found with this ID: ${id}`);
  }
  res.status(StatusCodes.OK).json({
    msg: `This sentence has been deleted ${req.params.id}`,
    subMsg: `These variables are also deleted : ${variable}`,
  });
};

module.exports = {
  getAllSentence,
  getSentence,
  createSentence,
  editSentence,
  deleteSentece,
};
