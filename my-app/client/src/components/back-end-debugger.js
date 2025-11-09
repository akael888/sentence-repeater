import { useState, useCallback } from "react";

function BackEndDebugger({
  incomingPreviewText,
  incomingVariables,
  currentLink,
  incomingHandleVariableChanges,
  incomingHandlePreviewTextChanges,
}) {
  const token = localStorage.getItem("token");
  const [sentence, setSentence] = useState({});
  const [variables, setVariables] = useState(new Map());
  const [currentSentence, setCurrentSentence] = useState();

  const link = currentLink;

  const refreshSentence = async () => {
    console.log("Refreshing Sentence..");
    try {
      const res = await fetch(`${link}/api/v1/sentence`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        let listSentence = {};
        data.sentence.forEach((element) => {
          listSentence[element._id] = element.sentence;
        });
        setSentence(listSentence);
        console.log("Succesfully Refreshing Data");
        console.log(listSentence);
      } else {
        console.log("Failed Refreshing Data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitSentence = async () => {
    console.log("Submitting Sentence..");
    try {
      const submitSentenceData = { sentence: incomingPreviewText };
      const resSentence = await fetch(`${link}/api/v1/sentence`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitSentenceData),
      });
      const dataSentence = await resSentence.json();
      const sentenceID = String(dataSentence.sentence._id);

      if (resSentence.ok) {
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
              `${link}/api/v1/sentence/${sentenceID}/variable`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(submitVariableData),
              }
            );
            const dataVariable = await resVariable.json();
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

  const refreshVariables = async (targetSentence) => {
    console.log("Refresing Variables..");
    const refSentence = targetSentence;
    try {
      const resVar = await fetch(
        `${link}/api/v1/sentence/${refSentence}/variable`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
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
        setVariables(listVar);
        console.log(`Refreshed variable data of sentence: ${refSentence}`);
      } else {
        console.log(`Failed to get variable data of sentence: ${refSentence}`);
      }
    } catch (error) {}
  };

  const deleteSentence = async (targetSentence) => {
    console.log("Deleting Sentence..");
    const refSentence = targetSentence;
    try {
      const resSentence = await fetch(
        `${link}/api/v1/sentence/${refSentence}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const dataSentence = await resSentence.json();
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
        `${link}/api/v1/sentence/${refSentence}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitSentenceandVariableData),
        }
      );
      const data = resSentence.json();
      console.log(data);

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

  const loadSentence = (targetSentence) => {
    console.log("Loading Sentence..");

    const selectedText = sentence[targetSentence];
    if (selectedText) {
      incomingHandlePreviewTextChanges(selectedText);
    }

    const clonedMap = new Map(
      Array.from(variables.entries()).map(([key, value]) => [key, { ...value }])
    );
    console.log("cloneMap:");
    console.log(clonedMap);
    console.log("variables:");
    console.log(variables);
    incomingHandleVariableChanges(clonedMap);

    console.log("Loading Successful!..");
  };

  const convertFrontEndVariableIntoDatabaseVariable = (
    frontendVariable,
    sentenceID
  ) => {
    console.log("Converting Front End Variable into Database Variable...");
    console.log(frontendVariable);
    let temptVariable = {};
    temptVariable = {
      _id: frontendVariable._id,
      order: frontendVariable.id
        ? frontendVariable.id + 1
        : frontendVariable.order,
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
          ? frontendVariable.dateValue.toISOString()
          : null,
      variableMinValue:
        frontendVariable.type !== "Date"
          ? frontendVariable.minValue
          : frontendVariable.randomize
          ? frontendVariable.minDateValue.toISOString()
          : null,
      variableMaxValue:
        frontendVariable.type !== "Date"
          ? frontendVariable.maxValue
          : frontendVariable.randomize
          ? frontendVariable.maxDateValue.toISOString()
          : null,
      variableList: frontendVariable.list ? frontendVariable.list.flat() : null,
      variableType: frontendVariable.type.toLowerCase(),
      usedBySentence: sentenceID,
      intervalCount: frontendVariable.interval,
    };
    return temptVariable;
  };

  const convertDatabaseVariableIntoFrontEndVariable = (databaseVariable) => {
    console.log("Converting Database Variable into Front End Variable...");
    console.log(databaseVariable);
    let temptVariable = {};
    temptVariable = {
      _id: databaseVariable._id,
      order: databaseVariable.order,
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
          ? databaseVariable.variableStartValue
          : null,
      minDateValue:
        databaseVariable.variableType === "date"
          ? databaseVariable.variableMinValue
          : null,
      maxDateValue:
        databaseVariable.variableType === "date"
          ? databaseVariable.variableMaxValue
          : null,
      list: databaseVariable.variableList,
    };

    return temptVariable;
  };

  function capitalizeFirstLetter(str) {
    if (!str) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="border-1">
      <h3>Back End Debugger</h3>
      <p>Current Link: {link}</p>
      <p>Current Sentence: {currentSentence}</p>
      <div className="grid">
        {Array.from(variables.entries()).map(([key, value]) => (
          <div key={key} className="bg-blue-800 hover:bg-blue-600">
            {key} : {value.name} ( {value.value} )
          </div>
        ))}
        <div>VarLeng:{variables.size}</div>
      </div>
      <div>-----</div>
      <div className="grid gap-1 place-items-strech">
        {Object.keys(sentence).map((value, index) => (
          <div className="flex w-full border-1 gap-2 ">
            <button
              key={index}
              onClick={() => {
                setCurrentSentence(String(value));
                refreshVariables(value);
              }}
              className="bg-yellow-800 hover:bg-yellow-600 w-[90%]"
            >
              {sentence[value]} : {value}
            </button>
            <button
              className="bg-red-800 hover:bg-red-600 place-self-end w-[10%] h-full"
              onClick={() => {
                deleteSentence(value);
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="gap-1 flex grid grid-cols-3">
        <button
          onClick={refreshSentence}
          className="bg-amber-500 text-black p-1 hover:bg-amber-200"
        >
          Refresh Sentence
        </button>
        <button
          onClick={() => {
            refreshVariables(currentSentence);
          }}
          className="bg-blue-500 text-black p-1 hover:bg-blue-200"
        >
          Refresh Variables
        </button>
        <button
          onClick={() => {
            updateSentence(currentSentence);
          }}
          className="bg-pink-500 text-black"
        >
          Update Sentence
        </button>
        <button
          onClick={submitSentence}
          className="bg-green-500 text-black p-1 hover:bg-green-200"
        >
          Submit Sentence
        </button>
        <button
          onClick={() => {
            loadSentence(currentSentence);
          }}
          className="bg-red-500 text-black"
        >
          Load Sentence
        </button>
      </div>
    </div>
  );
}

export default BackEndDebugger;
