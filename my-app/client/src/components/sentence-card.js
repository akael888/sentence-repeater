import { motion } from "motion/react";

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
  cardType = "default",
}) {
  let sentenceVariables = incomingVariables || null;
  let sentenceName = incomingSentenceName || "Sentence Name";
  let sentenceDescription =
    incomingSentenceDescription || "Sentence Description";
  let sentenceID = incomingSentenceID || null;
  let sentenceValue = incomingSentenceValue || "Sentence";
  let currentSentenceID = incomingCurrentSentenceId || "CurrSentenceID";
  const isCurrentSentence = currentSentenceID === sentenceID;

  return (
    <>
      {/* Current Sentence Card */}
      <motion.div
        className="flex w-full h-fit justify-center items-center flex-col gap-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-[80%] h-fit max-h-[50%] min-h-fit rounded-1 p-3 bg-gradient-to-r from-amber-800 to-amber-900 box-shadow shadow-md hover:from-amber-700 hover:to-amber-800 shadow-black">
          {/* Header Part of the Info */}
          <div className="w-full h-full flex p-1">
            <div className="flex flex-col items-start w-[90%] h-full p-1">
              <h3>{sentenceName}</h3>
              <div>
                <p>{sentenceDescription}</p>
              </div>
              {cardType === "default" ? (
                <div>
                  <p>
                    <i>"{sentenceValue}"</i>
                  </p>
                </div>
              ) : null}
              {sentenceID ? (
                <div className="p-1 border-1 rounded-1 text-[2dvw] sm:text-base ">
                  {sentenceID}
                </div>
              ) : null}
            </div>
            <div className="flex justify-center p-3">
              {cardType === "current" ? (
                sentenceID ? (
                  <button
                    className=" hover:bg-yellow-900 p-2 rounded-1 w-[50px] h-[50px] box-shadow shadow-black shadow-md"
                    onClick={() => {
                      incomingUpdateSentence(sentenceID);
                    }}
                  >
                    <img src="./svg/save-clear.svg" alt="Save Logo" />
                  </button>
                ) : null
              ) : (
                <>
                  <button
                    className={`${
                      isCurrentSentence ? "bg-green-900" : "hover:bg-yellow-900"
                    } p-2 rounded-1 w-[50px] h-[50px] box-shadow shadow-black shadow-md`}
                    onClick={() => {
                      incomingLoadSentence(sentenceID);
                    }}
                    disabled={isCurrentSentence}
                  >
                    {isCurrentSentence ? (
                      <img src="./svg/check-dark.svg" alt="Load Logo" />
                    ) : (
                      <img src="./svg/load-dark.svg" alt="Load Logo" />
                    )}
                  </button>
                  <button
                    className=" hover:bg-yellow-900 p-2 rounded-1 w-[50px] h-[50px] box-shadow shadow-black shadow-md"
                    onClick={() => {
                      incomingDeleteSentence(sentenceID);
                    }}
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
                        <div className="rounded-1 p-1 text-sm sm:text-[0.8dvw] break-words box-shadow shadow-black shadow-md hover:shadow-green-900">
                          {value.name}
                        </div>
                      </>
                    )
                  )}
              </div>
            </div>
            <div className="w-fit h-full flex flex-col justify-end items-end "></div>
          </div>
        </div>
        {/* <div className="w-[80%] h-fit flex justify-end">
                <div className="border-1 rounded-1 p-1 sm:text-[0.8dvw]">
                  {currentSentence.id}
                </div>
              </div> */}
      </motion.div>
    </>
  );
}

export default SentenceCard;
