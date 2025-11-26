import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRepeaterData } from "./repeater-context";

function SentenceList({ incomingLink, incomingCurrentUser }) {
  const {
    variables: incomingVariables,
    previewText: incomingPreviewText,
    handleVariableChanges: incomingHandleVariableChanges,
    handlePreviewTextChanges: incomingHandlePreviewTextChanges,
  } = useRepeaterData();

  const [dbMessage, setDbMessage] = useState([]);

  const [sentenceData, setSentenceData] = useState({
    sentenceName: "",
    sentenceDescription: "",
  });

  const [isSubmitNewSentence, setIsSubmitNewSentence] = useState(false);
  const [submitSentenceMessage, setSubmitSentenceMessage] = useState("");

  const [sentenceList, setSentenceList] = useState({
    0: {
      name: "Data A",
      description: "Qwerty",
      sentence: "ABC{}",
      isOptionOpened: false,
      variables: { 0: { name: "ABC" } },
    },
    1: {
      name: "Data B",
      description: "Qwerty",
      sentence: "DEF{}",
      isOptionOpened: false,
      variables: { 0: { name: "DEF" } },
    },
  });
  const [variableList, setVariableList] = useState(() => {
    try {
      const stored = localStorage.getItem("CURRENT_VARIABLES");
      if (stored) {
        const parsed = JSON.parse(stored);
        return new Map(parsed);
      }
    } catch (err) {
      console.error("Failed to parse variables from localStorage:", err);
    }
    return new Map();
  });

  const [currentSentence, setCurrentSentence] = useState(() => {
    try {
      const stored = localStorage.getItem("CURRENT_SENTENCE_OBJECT");
      if (stored) {
        const parsedObject = JSON.parse(stored);
        return parsedObject;
      }
    } catch (err) {
      console.error(
        "Failed to parse CURRENT SENTENCE ID from localStorage:",
        err
      );
    }
    return {};
  });

  const toggleOption = (keyToUpdate) => {
    setSentenceList((prevList) => ({
      ...prevList,
      [keyToUpdate]: {
        ...prevList[keyToUpdate],
        isOptionOpened: !prevList[keyToUpdate].isOptionOpened,
      },
    }));
  };

  const handleCurrentSentenceChanges = (sentenceObject) => {
    setCurrentSentence(sentenceObject);
    localStorage.setItem(
      "CURRENT_SENTENCE_OBJECT",
      JSON.stringify(sentenceObject)
    );
  };

  const handleDbMessageChanges = (message) => {
    setDbMessage([...dbMessage, message]);
  };

  const handleSentenceDataChanges = (e) => {
    setSentenceData({ ...sentenceData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log("incomingCurrentUser");
    console.log(incomingCurrentUser);
    if (incomingCurrentUser) {
      refreshSentence();
      // refreshVariables(currentSentence);
    }
  }, [incomingCurrentUser]);

  const submitSentence = async (
    incomingSentenceName,
    incomingSentenceDescription,
    e
  ) => {
    e.preventDefault();
    console.log("Submitting Sentence..");
    try {
      const submitSentenceData = {
        sentence: incomingPreviewText,
        sentenceName: incomingSentenceName,
        sentenceDescription: incomingSentenceDescription,
      };

      // Clear the Form Value After Submit
      setSentenceData({ sentenceName: "", sentenceDescription: "" });

      const resSentence = await fetch(`${incomingLink}/api/v1/sentence`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitSentenceData),
        credentials: "include",
      });
      const dataSentence = await resSentence.json();
      let sentenceID = "";

      if (dataSentence.msg) {
        await setSubmitSentenceMessage(dataSentence.msg);
      }

      if (resSentence.ok) {
        sentenceID = String(dataSentence.sentence._id);
        console.log(dataSentence.sentence._id);
        console.log(resSentence);
        console.log("Sentence Is Submitted!");
      } else {
        console.log("Sentence Failed to be Submitted!");
      }

      console.log("Submitting Variables");
      incomingVariables.forEach(async (element) => {
        try {
          if (element) {
            console.log(element);
            // let varType = String(element.type).toLowerCase;
            const submitVariableData =
              convertFrontEndVariableIntoDatabaseVariable(element, sentenceID);
            const resVariable = await fetch(
              `${incomingLink}/api/v1/sentence/${sentenceID}/variable`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(submitVariableData),
                credentials: "include",
              }
            );
            const dataVariable = await resVariable.json();
            if (dataVariable.msg) {
              await setSubmitSentenceMessage(dataSentence.msg);
            }
            console.log("submitvardata");
            console.log(resVariable);
            if (resVariable.ok) {
              console.log(dataVariable);
              console.log(`${element.name} variable is submitted`);
            } else {
              console.log(dataVariable);
              console.log(`Failed to submit variable ${element.name}`);
            }
          } else console.log("Empty Data");
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }

    refreshSentence();
  };

  const refreshSentence = async () => {
    console.log("Refreshing Sentence..");
    try {
      const res = await fetch(`${incomingLink}/api/v1/sentence`, {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if (data.msg) {
        await handleDbMessageChanges(data.msg);
      }
      if (res.ok) {
        let listSentence = {};
        for (const element of data.sentence) {
          listSentence[element._id] = {};
          listSentence[element._id]["sentence"] = element.sentence;
          listSentence[element._id]["name"] = element.sentenceName;
          listSentence[element._id]["description"] =
            element.sentenceDescription;
          listSentence[element._id]["variables"] = await refreshVariables(
            element._id
          );
        }
        setSentenceList(listSentence);

        console.log("Succesfully Refreshing Data");
        console.log(listSentence);
      } else {
        console.log("Failed Refreshing Data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshVariables = async (targetSentence) => {
    console.log("Refresing Variables..");
    const refSentence = targetSentence;
    try {
      const resVar = await fetch(
        `${incomingLink}/api/v1/sentence/${refSentence}/variable`,
        {
          method: "GET",
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const dataVariable = await resVar.json();
      console.log("dataVariable");
      console.log(dataVariable);
      if (dataVariable.msg) {
        await handleDbMessageChanges(dataVariable.msg);
      }
      if (resVar.ok) {
        console.log("ResVar OK");
        let listVar = new Map();
        dataVariable.variable.forEach((element, index) => {
          console.log(`ListVar Before assigining ${element}`);
          console.log(listVar);
          listVar.set(
            index,
            convertDatabaseVariableIntoFrontEndVariable(element)
          );
          console.log(`ListVar after assigining ${element}`);
          console.log(listVar);
        });
        console.log("listvar:");
        console.log(listVar);
        setVariableList(listVar);

        console.log(`Refreshed variable data of sentence: ${refSentence}`);
        return listVar;
      } else {
        console.log(`Failed to get variable data of sentence: ${refSentence}`);
      }
    } catch (error) {}
  };

  const loadSentence = async (targetSentence) => {
    // Taking sentence that is downloaded into Front End and apply it into the Repeater

    console.log("Loading Sentence..");
    const varMap = await refreshVariables(targetSentence);

    const selectedText = sentenceList[targetSentence].sentence;
    if (selectedText) {
      incomingHandlePreviewTextChanges(selectedText);
    }
    handleCurrentSentenceChanges({
      sentence: sentenceList[targetSentence].sentence,
      id: targetSentence,
      sentenceName: sentenceList[targetSentence].name,
      sentenceDescription: sentenceList[targetSentence].description,
    });
    const clonedMap = new Map(
      Array.from(varMap.entries()).map(([key, value]) => [key, { ...value }])
    );
    console.log("cloneMap:");
    console.log(clonedMap);
    console.log("variables:");
    incomingHandleVariableChanges(clonedMap);

    console.log("Loading Successful!..");
  };

  const deleteSentence = async (targetSentence) => {
    console.log("Deleting Sentence..");
    const refSentence = targetSentence;
    try {
      const resSentence = await fetch(
        `${incomingLink}/api/v1/sentence/${refSentence}`,
        {
          method: "DELETE",
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const dataSentence = await resSentence.json();
      if (dataSentence.msg) {
        await handleDbMessageChanges(dataSentence.msg);
      }
      if (resSentence.ok) {
        console.log(dataSentence);

        console.log(`Successfully Deleted ${refSentence}`);
      } else {
        console.log(dataSentence);
        console.log(`Failed deleting ${refSentence}`);
      }
      refreshSentence();
      refreshVariables(refSentence);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSentence = async (targetSentence) => {
    //Gak bakalan bisa Update Sentence Kalau Refresh, karena Sentencenya gak nyimpen ID
    try {
      const refSentence = targetSentence;
      const variableArray = Array.from(incomingVariables.values());
      const variableData = variableArray.map((element) => {
        return convertFrontEndVariableIntoDatabaseVariable(
          element,
          refSentence
        );
      });
      console.log("variableData");
      console.log(variableData);
      const submitSentenceandVariableData = {
        sentence: incomingPreviewText,
        variables: variableData,
      };
      const resSentence = await fetch(
        `${incomingLink}/api/v1/sentence/${refSentence}`,
        {
          method: "PATCH",
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitSentenceandVariableData),
          credentials: "include",
        }
      );
      const data = resSentence.json();
      console.log(data);
      if (data.msg) {
        await handleDbMessageChanges(data.msg);
      }

      if (resSentence.ok) {
        console.log(data);

        console.log("Data Successfully Updated!");
      } else {
        console.log(data);
        console.log("Data is not Updated!");
      }

      refreshSentence();
      refreshVariables(refSentence);
    } catch (error) {
      console.log(error);
    }
  };

  const convertFrontEndVariableIntoDatabaseVariable = (
    frontendVariable,
    sentenceID
  ) => {
    console.log("Converting Front End Variable into Database Variable...");
    console.log("Front End Variable Before Convert:");
    console.log(frontendVariable);
    let temptVariable = {};
    temptVariable = {
      _id: frontendVariable._id,
      order: frontendVariable.id,
      variableName: frontendVariable.name,
      variableOperation: (() => {
        let filterOperation = ["iterate", "randomize"];
        let filterObject = Object.entries(frontendVariable).filter(
          ([key, value]) => filterOperation.includes(key) && value === true
        );
        let matchedKeys = filterObject.map(([key]) => key);
        console.log("matchedkeys:");
        console.log(matchedKeys);
        return matchedKeys.length > 0 ? matchedKeys.join(",") : "none";
      })(),
      variableStartValue:
        frontendVariable.type !== "Date"
          ? frontendVariable.value
          : frontendVariable.iterate
          ? new Date(frontendVariable.value).toISOString()
          : null,
      variableMinValue:
        frontendVariable.type !== "Date"
          ? frontendVariable.minValue
          : frontendVariable.randomize
          ? new Date(frontendVariable.minDateValue).toISOString()
          : null,
      variableMaxValue:
        frontendVariable.type !== "Date"
          ? frontendVariable.maxValue
          : frontendVariable.randomize
          ? new Date(frontendVariable.maxDateValue).toISOString()
          : null,
      variableList: frontendVariable.list ? frontendVariable.list.flat() : null,
      variableType: frontendVariable.type.toLowerCase(),
      usedBySentence: sentenceID,
      intervalCount: frontendVariable.interval,
    };
    console.log("Database Variable After Convert:");
    console.log(temptVariable);
    return temptVariable;
  };

  const convertDatabaseVariableIntoFrontEndVariable = (databaseVariable) => {
    console.log("Converting Database Variable into Front End Variable...");
    console.log("Database Variable Before Convert:");
    console.log(databaseVariable);
    let temptVariable = {};
    temptVariable = {
      _id: databaseVariable._id,
      id: databaseVariable.order,
      name: databaseVariable.variableName,
      type: capitalizeFirstLetter(databaseVariable.variableType),
      iterate: databaseVariable.variableOperation === "iterate",
      randomize: databaseVariable.variableOperation === "randomize",
      value: databaseVariable.variableStartValue,
      interval: databaseVariable.intervalCount,
      minValue: databaseVariable.variableMinValue,
      maxValue: databaseVariable.variableMaxValue,
      dateValue:
        databaseVariable.variableType === "date"
          ? new Date(databaseVariable.variableStartValue).toISOString()
          : null,
      minDateValue:
        databaseVariable.variableType === "date"
          ? new Date(databaseVariable.variableMinValue).toISOString()
          : null,
      maxDateValue:
        databaseVariable.variableType === "date"
          ? new Date(databaseVariable.variableMaxValue).toISOString()
          : null,
      list: databaseVariable.variableList,
    };
    console.log("Front End Variable After Convert:");
    console.log(temptVariable);

    return temptVariable;
  };

  function capitalizeFirstLetter(str) {
    if (!str) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      {incomingCurrentUser ? (
        <div className="sm:p-10 p-2 [&>*]:text-xs [&>*]:sm:text-base">
          {/* Sentence Full Table */}
          <div className=" w-full flex flex-col gap-1">
            {/* Current Sentence */}
            <div className="flex w-full h-full justify-center items-center flex-col gap-1">
              <div className="w-[80%] h-fit max-h-[50%] min-h-fit border-1 rounded-1 p-1">
                {/* Header Part of the Info */}
                <div className="w-full h-full flex p-1">
                  <div className="flex flex-col items-start w-[90%] h-full p-1">
                    <h3>{currentSentence.sentenceName}</h3>
                    <div>
                      <p>{currentSentence.sentenceDescription}</p>
                    </div>
                  </div>
                  <div className="flex justify-center p-3">
                    <button
                      className="border-1 border-yellow-800 hover:bg-yellow-900 p-2 rounded-5 w-[50px] h-[50px]"
                      onClick={() => {
                        updateSentence(currentSentence.id);
                      }}
                    >
                      ↑
                    </button>
                  </div>
                </div>
                {/* Body Part of the Info */}
                <div className="w-full h-full flex p-1">
                  <div className="w-full h-full flex flex-col  items-start p-1">
                    <h6>Variables</h6>
                    <div className="w-full h-full grid-cols-4 grid gap-1 justify-around">
                      {Array.from(incomingVariables.entries()).map(
                        ([key, value]) => (
                          <>
                            <div className="border-1 rounded-1 p-1 text-[0.8dvw] break-words">
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
            </div>
            {/* Selected Variables */}
            {/* {Array.from(incomingVariables.entries()).map(([key, value]) => (
              <div key={key} className="w-full">
                <strong>{value.name}</strong> ({value.type}) :{" "}
                <i>"{value.value}"</i>
              </div>
            ))} */}
            {/* Submit New Sentence */}

            <div className="flex flex-col justify-center gap-2 p-3">
              {isSubmitNewSentence ? (
                <>
                  <form
                    className="flex flex-row justify-center gap-2 "
                    onSubmit={(e) => {
                      submitSentence(
                        sentenceData.sentenceName,
                        sentenceData.sentenceDescription,
                        e
                      );
                    }}
                  >
                    <textarea
                      name="sentenceName"
                      placeholder="Sentence Name"
                      value={sentenceData.sentenceName}
                      onChange={handleSentenceDataChanges}
                      className="bg-transparent border-b text-center resize-none h-fit w-fit"
                    ></textarea>
                    <textarea
                      name="sentenceDescription"
                      placeholder="Sentence Description"
                      alue={sentenceData.sentenceDescription}
                      onChange={handleSentenceDataChanges}
                      className="bg-transparent border-b text-center resize-none h-fit w-fit"
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-green-800 hover:bg-green-700 text-center p-2 rounded-1"
                    >
                      Submit
                    </button>
                  </form>
                  <div>{submitSentenceMessage}</div>
                </>
              ) : (
                <></>
              )}
              <div className="w-full gap-2 flex flex-row justify-center">
                <motion.button
                  onClick={() => {
                    setIsSubmitNewSentence(!isSubmitNewSentence);
                  }}
                  className="w-full p-2 "
                >
                  <motion.span
                    animate={{ rotate: isSubmitNewSentence ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.span>
                </motion.button>
              </div>

              {/* <button className="bg-amber-900 w-fit h-fit f p-1 rounded-1">
              ⇓ Load
            </button> */}
            </div>
            {/* Sentence List Header */}
            <div className="p-1 flex w-full h-full">
              <div className="p-1 w-[90dvw]">
                <h3>
                  <strong>Sentence List</strong>
                </h3>
              </div>
              <div className="w-[10dvw]">
                <button
                  className="w-full h-full p-1 rounded-1 sm:h-full border-1 border-amber-700 hover:bg-amber-700"
                  onClick={refreshSentence}
                >
                  ⟳
                </button>
              </div>
            </div>
            {/* Selected Variables */}
            {/* {Array.from(variableList.entries()).map(([key, value]) => (
              <div key={key} className="bg-blue-800 hover:bg-blue-600">
                {key} : {value.name} ( {value.value} )
              </div>
            ))} */}
            {/* Sentence List */}
            <div className="grid gap-2 max-h-[20dvh] overflow-y-scroll h-full max-w-[100%] min-h-[10dvh] inset-shadow-sm shadow-black p-1 border-t border-b">
              {Object.keys(sentenceList).map((value, index) => (
                <>
                  {/* sm:[&>*]:h-[5dvh] [&>*]:h-[10dvh] */}
                  <div className="flex w-full gap-2">
                    <div className="w-full border-1 rounded-1">
                      <div
                        key={index}
                        className="bg-transparent hover:bg-yellow-600 w-full h-fit rounded-1 p-1"
                      >
                        <div className="border-b">
                          <strong>{sentenceList[value].name}</strong>
                        </div>
                        <div>{sentenceList[value].description}</div>
                        <div>
                          <i> "{sentenceList[value].sentence}"</i>
                        </div>
                      </div>
                      <div className="p-1  w-full b">
                        {/* Variable List */}
                        {sentenceList[value].variables instanceof Map &&
                          Array.from(
                            sentenceList[value].variables.entries()
                          ).map(([varKey, varValue]) => (
                            <div key={varKey} className="w-full ">
                              <div>
                                <strong>{varValue.name}</strong> (
                                {varValue.type}) : <i>"{varValue.value}"</i>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <button
                      className="bg-amber-900 sm:w-[5dvw] w-[15dvw] p-1 rounded-1 disabled:bg-green-600 hover:bg-amber-800"
                      onClick={() => {
                        loadSentence(value);
                      }}
                      disabled={currentSentence.id === value}
                    >
                      {currentSentence.id === value ? "✔" : "⇓"}
                    </button>

                    {sentenceList[value].isOptionOpened ? (
                      <>
                        <button
                          className="bg-red-800 hover:bg-red-600  w-full h-full rounded-1 p-1"
                          onClick={() => {
                            deleteSentence(value);
                          }}
                        >
                          ✖ Delete
                        </button>
                        <button
                          className="w-full bg-gray-900 p-1 hover:bg-gray-800"
                          onClick={() => {
                            toggleOption(value);
                          }}
                        >
                          ⋮
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="sm:w-[5dvw] w-[15dvw] bg-gray-900 p-1 hover:bg-gray-800"
                          onClick={() => {
                            toggleOption(value);
                          }}
                        >
                          ⋮
                        </button>
                      </>
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="w-full h-fit p-2">
            {dbMessage[dbMessage.length - 1]}
          </div>
        </div>
      ) : (
        <div>
          <strong>Not Logged In</strong>{" "}
          <p>Please Log In to Access Stored Sentence Data</p>
        </div>
      )}
    </>
  );
}

export default SentenceList;
