import { useEffect, useState } from "react";

function SentenceTempData({ sentenceData, variableData, currentLink }) {
  const token = localStorage.getItem("token");
  const [sentence, setSentence] = useState({});
  const [variables, setVariables] = useState({});
  const [currentSentence, setCurrentSentence] = useState();

  const link = currentLink;

  const refreshSentence = async () => {
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
  };

  const refreshVariables = async () => {
    try {
      const resVar = await fetch(
        `${link}/api/v1/sentence/${currentSentence}/variable`,
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
          listVar[element.variableName] = element.variableStartValue;
        });
        console.log(dataVariable);
        setVariables(listVar);
        console.log("done get variable data");
      } else {
        console.log("failed to get variable data");
      }
    } catch (error) {}
  };

  return (
    <div className="">
      <p>Current Link: {link}</p>
      <p>Current Sentence: {currentSentence}</p>
      <div className="grid">
        {Object.keys(variables).map((keys, index) => (
          <div key={index} className="bg-blue-800 hover:bg-blue-600">
            {keys} : {variables[keys]}
          </div>
        ))}
      </div>
      <div>-----</div>
      <div className="grid">
        {Object.keys(sentence).map((value, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSentence(String(value));
            }}
            className="bg-yellow-800 hover:bg-yellow-600"
          >
            {sentence[value]} : {value}
          </button>
        ))}
      </div>

      <div className="gap-1 flex">
        {" "}
        <button onClick={refreshSentence} className="bg-white text-black">
          Refresh Sentence
        </button>
        <button onClick={refreshVariables} className="bg-blue-500 text-black">
          Refresh Variables
        </button>
        <button onClick={submitSentence} className="bg-green-500 text-black">
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

export default SentenceTempData;
