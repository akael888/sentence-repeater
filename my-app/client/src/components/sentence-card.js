import { motion } from "motion/react";
import { useEffect, useState } from "react";

function SentenceCard({
  incomingUpdateSentence,
  incomingLoadSentence,
  incomingDeleteSentence,
  incomingSentenceName,
  incomingSentenceDescription,
  incomingSentenceID,
  incomingSentenceValue,
  incomingVariables,
  incomingCurrentSentenceId,
  incomingSubmitSentence,
  incomingHandleCurrentSentenceChanges,
  incomingSetSentenceData,
  incomingSentenceData,
  cardType = "default",
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  // const [sentenceData, setSentenceData] = useState({
  //   sentenceName: incomingSentenceName || "Sentence Name",
  //   sentenceDescription: incomingSentenceDescription || "Sentence Description",
  // });

  let sentenceVariables = incomingVariables || null;
  let sentenceName =
    incomingSentenceData != null
      ? incomingSentenceData.sentenceName
      : incomingSentenceName || "Sentence Name";
  let sentenceDescription =
    incomingSentenceData != null
      ? incomingSentenceData.sentenceDescription
      : incomingSentenceDescription || "Sentence Description";
  let sentenceID = incomingSentenceID || null;
  let sentenceValue = incomingSentenceValue || "Sentence";
  let currentSentenceID = incomingCurrentSentenceId || "CurrSentenceID";
  const isCurrentSentence = currentSentenceID === sentenceID;

  const handleSentenceDataChanges = (e) => {
    // setSentenceData({ ...sentenceData, [e.target.name]: e.target.value });
    incomingSetSentenceData({
      ...incomingSentenceData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Current Sentence Card */}
      <motion.div
        className="flex w-full h-full justify-center items-center flex-col gap-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <form
          onSubmit={(e) =>
            incomingSubmitSentence(sentenceName, sentenceDescription, e)
          }
          className="w-full  max-h-fit h-full rounded-1 p-3 bg-gradient-to-r from-amber-800 to-amber-900 box-shadow shadow-md hover:from-amber-700 hover:to-amber-800 shadow-black"
        >
          {/* Header Part of the Info */}
          <div className="w-full h-fit flex p-1">
            <div className="flex flex-col items-start w-[90%] h-fit p-1">
              {isEditingName ? (
                <h3>
                  <input
                    className="bg-transparent h-full w-full break-words"
                    name="sentenceName"
                    placeholder="Sentence Name"
                    value={sentenceName}
                    onChange={handleSentenceDataChanges}
                    onBlur={() => setIsEditingName(false)}
                    autoFocus
                  />
                </h3>
              ) : (
                <h3
                  onClick={() => {
                    cardType === "current" && setIsEditingName(true);
                  }}
                  className={`break-words text-left w-full ${
                    cardType === "current" && "hover:text-white cursor-pointer"
                  }`}
                >
                  {sentenceName !== "" ? sentenceName : "Sentence Name"}
                </h3>
              )}

              <div>
                {isEditingDescription ? (
                  <p>
                    <input
                      className="bg-transparent h-full w-fit text-break"
                      name="sentenceDescription"
                      placeholder="Sentence Description"
                      value={sentenceDescription}
                      onChange={handleSentenceDataChanges}
                      onBlur={() => setIsEditingDescription(false)}
                      autoFocus
                    />
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      cardType === "current" && setIsEditingDescription(true);
                    }}
                    className={`break-words text-left w-full ${
                      cardType === "current" &&
                      "hover:text-white cursor-pointer"
                    }`}
                  >
                    {sentenceDescription !== ""
                      ? sentenceDescription
                      : "Sentence Description"}
                  </p>
                )}
              </div>
              <div>
                <p>
                  <i>"{sentenceValue}"</i>
                </p>
              </div>
              {sentenceID && (
                <div className="p-1 border-1 rounded-1 text-[2dvw] sm:text-base ">
                  {sentenceID}
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row justify-center p-3 h-fit">
              {cardType === "current" ? (
                sentenceID ? (
                  <>
                    <button
                      className=" hover:bg-yellow-900 active:scale-[0.9] p-2 rounded-1 w-[50px] h-[50px] box-shadow shadow-black shadow-md"
                      onClick={() => {
                        incomingUpdateSentence(sentenceID);
                      }}
                      type="button"
                    >
                      <img src="./svg/save-clear.svg" alt="Save Logo" />
                    </button>
                    <button
                      className=" hover:bg-yellow-900 active:scale-[0.9] p-2 rounded-1 w-[50px] h-[50px] box-shadow shadow-black shadow-md"
                      type="submit"
                    >
                      <img src="./svg/plus-dark.svg" alt="Upload Logo" />
                    </button>
                  </>
                ) : (
                  <button
                    className=" hover:bg-yellow-900 active:scale-[0.9] p-2 rounded-1 w-[50px] h-[50px] box-shadow shadow-black shadow-md"
                    type="submit"
                  >
                    <img src="./svg/plus-dark.svg" alt="Upload Logo" />
                  </button>
                )
              ) : (
                <>
                  <button
                    className={`${
                      isCurrentSentence ? "bg-green-900" : "hover:bg-yellow-900"
                    } p-2 rounded-1 w-[50px] h-[50px] box-shadow shadow-black shadow-md active:scale-[0.9]`}
                    onClick={() => {
                      incomingLoadSentence(sentenceID);
                    }}
                    disabled={isCurrentSentence}
                    type="button"
                  >
                    {isCurrentSentence ? (
                      <img src="./svg/check-dark.svg" alt="Load Logo" />
                    ) : (
                      <img src="./svg/load-dark.svg" alt="Load Logo" />
                    )}
                  </button>
                  <button
                    className=" hover:bg-yellow-900 p-2 rounded-1 w-[50px] h-[50px] box-shadow shadow-black shadow-md active:scale-[0.9]"
                    onClick={() => {
                      incomingDeleteSentence(sentenceID);
                    }}
                    type="button"
                  >
                    <img src="./svg/delete-dark.svg" alt="Delete Logo" />
                  </button>
                </>
              )}
            </div>
          </div>
          {/* Body Part of the Info */}
          <div className="w-full h-fit flex p-1">
            <div className="w-full h-fit flex flex-col  items-start p-1">
              {sentenceVariables && sentenceVariables.size > 0 ? (
                <h6>Variables</h6>
              ) : null}

              <div className="w-full grid-cols-4 grid gap-1 justify-around">
                {sentenceVariables &&
                  sentenceVariables.size > 0 &&
                  Array.from(sentenceVariables.entries()).map(
                    ([key, value]) => (
                      <>
                        <div className="rounded-1 p-1 text-[2dvw] sm:text-[0.8dvw] break-words box-shadow shadow-black shadow-md hover:shadow-green-900">
                          {value.name}
                        </div>
                      </>
                    )
                  )}
              </div>
            </div>
            <div className="w-fit h-full flex flex-col justify-end items-end "></div>
          </div>

          {/* <div className="w-[80%] h-fit flex justify-end">
                <div className="border-1 rounded-1 p-1 sm:text-[0.8dvw]">
                  {currentSentence.id}
                </div>
              </div> */}
        </form>
      </motion.div>
    </>
  );
}

export default SentenceCard;
