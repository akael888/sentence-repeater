import { useEffect, useState } from "react";

function BackEndDebugger({ sentenceData, variableData, currentLink }) {
  const token = localStorage.getItem("token");
  const [sentence, setSentence] = useState({});
  const [variables, setVariables] = useState({});
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
                element.type != "Date"
                  ? element.value
                  : element.iterate
                  ? element.dateValue.toISOString()
                  : null,
              variableMinValue:
                element.type != "Date"
                  ? element.minValue
                  : element.randomize
                  ? element.minDateValue.toISOString()
                  : null,
              variableMaxValue:
                element.type != "Date"
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

  const refreshVariables = async (targetSentence = null) => {
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
      if (resVar.ok) {
        let listVar = {};
        dataVariable.variable.forEach((element) => {
          listVar[element._id] = element.variableName;
        });
        console.log(dataVariable);
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

  return (
    <div className="border-1">
      <h3>Back End Debugger</h3>
      <p>Current Link: {link}</p>
      <p>Current Sentence: {currentSentence}</p>
      <div className="grid">
        {Object.keys(variables).map((keys, index) => (
          <div key={index} className="bg-blue-800 hover:bg-blue-600">
            {variables[keys]} : {keys}
          </div>
        ))}
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
        <button onClick={refreshSentence} className="bg-amber-500 text-black p-1 hover:bg-amber-200">
          Refresh Sentence
        </button>
        <button onClick={refreshVariables} className="bg-blue-500 text-black p-1 hover:bg-blue-200">
          Refresh Variables
        </button>
        <button onClick={submitSentence} className="bg-green-500 text-black p-1 hover:bg-green-200">
          Submit Sentence
        </button>
        {/* <button
          onClick={() => {
            console.log(variableData);
          }}
          className="bg-red-500 text-black"
        >
          Select Sentence
        </button> */}
      </div>
    </div>
  );
}

export default BackEndDebugger;
