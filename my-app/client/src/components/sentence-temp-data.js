import { useEffect, useState } from "react";

function SentenceTempData({ sentenceData, variableData }) {
  const token = localStorage.getItem("token");
  const [sentence, setSentence] = useState();
  const [variables, setVariables] = useState();

  const refreshSentence = async () => {
    try {
      const res = await fetch("https://sentence-repeater-backend.vercel.app/api/v1/sentence", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        const listSentence = [];
        data.sentence.forEach((element) => {
          listSentence.push(element.sentence);
        });
        setSentence([listSentence]);
        console.log("Succesfully Refreshing Data");
        console.log(data.sentence);
      } else {
        console.log("Failed Refreshing Data");
      }

      // const sentenceID = String(data.sentence._id);

      // try {
      //   const resVar = await fetch(`api/v1/sentence/${sentenceID}/variable`, {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //   });

      //   const dataVariable = resVar.json();
      //   if (resVar.ok) {
      //     const listVar = [];
      //     dataVariable.variable.forEach((element) => {
      //       listVar.push(element.variable);
      //     });
      //     console.log(dataVariable);
      //     setVariables([listVar]);
      //     console.log("done get variable data");
      //   } else {
      //     console.log("failed to get variable data");
      //   }
      // } catch (error) {}
    } catch (error) {
      console.log(error);
    }
  };

  const submitSentence = async () => {
    try {
      const submitSentenceData = { sentence: sentenceData };
      const resSentence = await fetch("https://sentence-repeater-backend.vercel.app/api/v1/sentence", {
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

      try {
        let indexCounter = 1;
        variableData.forEach(async (element) => {
          if (element) {
            console.log(element);
            // let varType = String(element.type).toLowerCase;
            const submitVariableData = {
              order: indexCounter,
              variableName: element.name,
              variableOperation: "none",
              variableStartValue: element.value,
              variableType: element.type.toLowerCase(),
              usedBySentence: sentenceID,
              intervalCount: 3,
            };
            const resVariable = await fetch(
              `api/v1/sentence/${sentenceID}/variable`,
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
              console.log("Failed to submit");
            }
            indexCounter++;
          }
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <p>{sentence ? sentence : "No sentence loaded yet"}</p>
      <p>{variables ? variables : "No variables loaded yet"}</p>
      <div className="gap-1 flex">
        {" "}
        <button onClick={refreshSentence} className="bg-white text-black">
          Refresh Sentence
        </button>
        <button onClick={submitSentence} className="bg-green-500 text-black">
          Submit Sentence
        </button>
        <button
          onClick={() => {
            console.log(variableData);
          }}
          className="bg-red-500 text-black"
        >
          Select Sentence
        </button>
        <button
          onClick={() => {
            console.log(variableData);
          }}
          className="bg-blue-500 text-black"
        >
          Show Variable Data
        </button>
      </div>
    </div>
  );
}

export default SentenceTempData;
