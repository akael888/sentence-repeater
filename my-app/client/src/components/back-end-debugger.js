import { useState } from "react";

function BackEndDebugger({
  sentenceData,
  variableData,
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
      const submitSentenceData = { sentence: sentenceData };
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
        console.log("Is Submitted!");
      } else {
        console.log("Sentence Data Failed!");
      }

      variableData.forEach(async (element) => {
        try {
          if (element) {
            console.log(element);
            // let varType = String(element.type).toLowerCase;
            const submitVariableData = {
              order: element.id + 1,
              variableName: element.name,
              variableOperation: (() => {
                let filterOperation = ["iterate", "randomize"];
                let filterObject = Object.entries(element).filter(
                  ([key, value]) =>
                    filterOperation.includes(key) && value === true
                );
                let matchedKeys = filterObject.map(([key]) => key);
                console.log("matchedkeys:");
                console.log(matchedKeys);
                return matchedKeys.length > 0 ? matchedKeys.join(",") : "none";
              })(),
              variableStartValue:
                element.type !== "Date"
                  ? element.value
                  : element.iterate
                  ? element.dateValue.toISOString()
                  : null,
              variableMinValue:
                element.type !== "Date"
                  ? element.minValue
                  : element.randomize
                  ? element.minDateValue.toISOString()
                  : null,
              variableMaxValue:
                element.type !== "Date"
                  ? element.maxValue
                  : element.randomize
                  ? element.maxDateValue.toISOString()
                  : null,
              variableList: element.list ? element.list.flat() : null,
              variableType: element.type.toLowerCase(),
              usedBySentence: sentenceID,
              intervalCount: element.interval,
            };
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

  const refreshVariables = async (targetSentence = currentSentence) => {
    console.log("Refresing Variables..");
    try {
      const resVar = await fetch(
        `${link}/api/v1/sentence/${targetSentence || currentSentence}/variable`,
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
        console.log("done get variable data");
      } else {
        console.log("failed to get variable data");
      }
    } catch (error) {}
  };

  const deleteSentence = async (targetSentence = null) => {
    console.log("Deleting Sentence..");
    const refSentence = targetSentence || currentSentence;
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

      if (variables != null) {
        Object.entries(variables).forEach(async (index, value) => {
          console.log("index and value");
          console.log(index);
          console.log(value);
          try {
            const resVar = await fetch(
              `${link}/api/v1/sentence/${
                targetSentence || currentSentence
              }/variable/${index[0]}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            const dataVar = await resVar.json();

            if (resVar.ok) {
              console.log(dataVar);
              console.log(`${index} : ${value} variable successfully deleted!`);
            } else {
              console.log(dataVar);
              console.log(
                `${index} : ${value} variable are failed to be deleted!`
              );
            }
          } catch (error) {
            console.log(error);
          }
        });
      }

      refreshSentence();
      refreshVariables(refSentence);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSentence = async () => {
    incomingHandlePreviewTextChanges(sentence[currentSentence]);
    incomingHandleVariableChanges(variables);
  };

  const convertDatabaseVariableIntoFrontEndVariable = (databaseVariable) => {
    console.log("Converting Database Variable into Front End Variable...");
    console.log(databaseVariable);
    let temptVariable = {};
    temptVariable = {
      id: databaseVariable._id,
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

    // const typeValue = databaseVariable.variableType;
    // const tempVariable = {};
    // Object.entries;
    // switch (typeValue) {
    //   case "Integer":
    //     incomingTargetVar.iterate = true;
    //     incomingTargetVar.interval = 1;
    //     incomingTargetVar.randomize = false;
    //     incomingTargetVar.value = 1;
    //     incomingTargetVar.minValue = 1;
    //     incomingTargetVar.maxValue = 10;
    //     // tempTypeValidator.Integer = true;
    //     break;
    //   case "String":
    //     incomingTargetVar.iterate = false;
    //     incomingTargetVar.interval = null;
    //     incomingTargetVar.randomize = null;
    //     incomingTargetVar.value = "";
    //     incomingTargetVar.minValue = null;
    //     incomingTargetVar.maxValue = null;
    //     // tempTypeValidator.String = true;
    //     break;
    //   case "Date":
    //     incomingTargetVar.iterate = true;
    //     incomingTargetVar.interval = 1;
    //     incomingTargetVar.randomize = false;
    //     incomingTargetVar.value = null;
    //     incomingTargetVar.minValue = null;
    //     incomingTargetVar.maxValue = null;
    //     incomingTargetVar.dateValue = new Date();
    //     incomingTargetVar.minDateValue = new Date();
    //     incomingTargetVar.maxDateValue = new Date();
    //     // tempTypeValidator.Date = true;
    //     break;
    //   case "List":
    //     console.log("List");
    //     incomingTargetVar.iterate = true;
    //     incomingTargetVar.interval = 1;
    //     incomingTargetVar.randomize = false;
    //     incomingTargetVar.value = "";
    //     incomingTargetVar.minValue = null;
    //     incomingTargetVar.maxValue = null;
    //     incomingTargetVar.list = [];
    //     // tempTypeValidator.List = true;
    //     break;
    //   default:
    //     break;
    // }
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
          onClick={refreshVariables}
          className="bg-blue-500 text-black p-1 hover:bg-blue-200"
        >
          Refresh Variables
        </button>
        <button
          onClick={submitSentence}
          className="bg-green-500 text-black p-1 hover:bg-green-200"
        >
          Submit Sentence
        </button>
        <button onClick={loadSentence} className="bg-red-500 text-black">
          Load Sentence
        </button>
      </div>
    </div>
  );
}

export default BackEndDebugger;
