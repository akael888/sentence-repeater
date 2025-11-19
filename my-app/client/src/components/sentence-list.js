import { useEffect } from "react";
import { useState } from "react";
import { useRepeaterData } from "./repeater-context";

function SentenceList({ incomingLink, incomingCurrentUser }) {
  const {
    variables: incomingVariables,
    handleVariableChanges: incomingHandleVariableChanges,
    handlePreviewTextChanges: incomingHandlePreviewTextChanges,
  } = useRepeaterData();

  const [sentenceList, setSentenceList] = useState({
    0: {
      name: "Test 1",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    1: {
      name: "Test 2",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    2: {
      name: "Test 3",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    3: {
      name: "Test 4",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    4: {
      name: "Test 4",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    5: {
      name: "Test 5",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    6: {
      name: "Test 6",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    7: {
      name: "Test 7",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
  });
  const [variableList, setVariableList] = useState(new Map());

  const [currentSentence, setCurrentSentence] = useState(() => {
    try {
      const stored = localStorage.getItem("CURRENT_SENTENCE_ID");
      if (stored) {
        return stored;
      }
    } catch (err) {
      console.error(
        "Failed to parse CURRENT SENTENCE ID from localStorage:",
        err
      );
    }
    return true;
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

  const handleCurrentSentenceChanges = (sentenceID) => {
    setCurrentSentence(sentenceID);
    localStorage.setItem("CURRENT_SENTENCE_ID", sentenceID);
  };

  useEffect(() => {
    console.log("incomingCurrentUser");
    console.log(incomingCurrentUser);
    if (incomingCurrentUser) {
      refreshSentence();
    }
  }, [incomingCurrentUser]);

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

      if (res.ok) {
        let listSentence = {};
        data.sentence.forEach((element) => {
          listSentence[element._id] = {};
          listSentence[element._id]["sentence"] = element.sentence;
          listSentence[element._id]["name"] = element.sentenceName;
          listSentence[element._id]["description"] =
            element.sentenceDescription;
        });
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
        return listVar;
        console.log(`Refreshed variable data of sentence: ${refSentence}`);
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

    const clonedMap = new Map(
      Array.from(varMap.entries()).map(([key, value]) => [key, { ...value }])
    );
    console.log("cloneMap:");
    console.log(clonedMap);
    console.log("variables:");
    incomingHandleVariableChanges(clonedMap);

    console.log("Loading Successful!..");
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
      <div className="sm:p-10 p-2 [&>*]:text-xs [&>*]:sm:text-base">
        <div className=" w-full flex flex-col gap-1">
          <div className="p-1 flex w-full  h-full">
            <div className="p-1 w-[80dvh]">
              <h5>Sentence List</h5>
            </div>
            <button
              className="bg-amber-700 w-[10dvh] h-full p-1 rounded-1 sm:h-full"
              onClick={refreshSentence}
            >
              ⟳
            </button>
          </div>
          <div>Current Sentence : {currentSentence}</div>
          {Array.from(variableList.entries()).map(([key, value]) => (
            <div key={key} className="bg-blue-800 hover:bg-blue-600">
              {key} : {value.name} ( {value.value} )
            </div>
          ))}
          <div className="flex justify-center gap-2 p-1">
            {/* <button className="bg-amber-900 w-fit h-fit f p-1 rounded-1">
              ⇓ Load
            </button> */}
          </div>
          <div className="grid gap-1 max-h-[20dvh] overflow-y-scroll h-full  max-w-[100%] min-h-[10dvh] inset-shadow-sm shadow-black border-1 p-1">
            {Object.keys(sentenceList).map((value, index) => (
              <div className="flex w-full gap-2">
                <button
                  key={index}
                  className="bg-yellow-800 hover:bg-yellow-600 w-full rounded-1 p-1 overflow-hidden"
                  onClick={() => {
                    handleCurrentSentenceChanges(value);
                    refreshVariables(value);
                  }}
                >
                  {sentenceList[value].name} : {sentenceList[value].description}{" "}
                  | Sentence : {sentenceList[value].sentence}
                </button>
                <button
                  className="bg-amber-900 w-fit h-full f p-1 rounded-1"
                  onClick={() => {
                    handleCurrentSentenceChanges(value);
                    loadSentence(value);
                  }}
                >
                  ⇓ Load
                </button>

                {sentenceList[value].isOptionOpened ? (
                  <>
                    <button className="bg-red-800 hover:bg-red-600 place-self-end w-full h-full rounded-1 p-1">
                      ✖ Delete
                    </button>
                    <button
                      className="w-full bg-gray-900 p-1"
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
                      className="w-[10%] bg-gray-900 p-1"
                      onClick={() => {
                        toggleOption(value);
                      }}
                    >
                      ⋮
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SentenceList;
