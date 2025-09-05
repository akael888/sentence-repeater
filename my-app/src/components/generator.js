import { useEffect, useState } from "react";
import css from "./generator.module.css";

function Generator({
  incomingVariables,
  incomingPreviewText,
  incomingHandleGeneratedSentenceChanges,
  incomingHighestListVar,
}) {
  const [generatedSentenceAmount, setGeneratedSentenceAmount] = useState(0);

  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    setInputValue(incomingHighestListVar.list?.length || "");

    console.log(
      "incominghighestlistvar in gen len: " +
        incomingHighestListVar.list?.length || ""
    );
    if (incomingHighestListVar.list.length > 0) {
      setGeneratedSentenceAmount(incomingHighestListVar.list.length);
    }
  }, [incomingHighestListVar.list.length]);

  function handleGeneratedSentenceAmountChanges(amount) {
    setGeneratedSentenceAmount(amount);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomfromList(sourceList) {
    const randomIndex = Math.floor(Math.random() * sourceList.length);
    return sourceList[randomIndex];
  }

  function getRandomfromDate(minDate, maxDate) {
    const minDateTimeStamp = minDate.getTime();
    const maxDateTimeStamp = maxDate.getTime();

    const randomTimeStamp =
      minDateTimeStamp +
      Math.random() * (maxDateTimeStamp - minDateTimeStamp + 1);
    const randomDate = new Date(randomTimeStamp);
    console.log("Min Time Stamp : " + minDateTimeStamp);
    console.log("Min Time Stamp Date : " + minDate);
    console.log("Max Time Stamp : " + maxDateTimeStamp);
    console.log("Max Time Stamp Date : " + maxDate);
    console.log("Random Time Stamp : " + randomTimeStamp);

    // const formatYear = randomDate.getFullYear();
    // const formatMonth = randomDate.getMonth()+1;
    // const formatDate =randomDate.getDate();
    // const formattedDate = `-${formatMonth} ${formatDate},${formatYear}`

    const formattedDate = randomDate.toLocaleString("en-US", {
      dateStyle: "long",
    });

    return formattedDate;
  }

  function generateSentence() {
    let tempPreviewText = incomingPreviewText;
    let localGeneratedSentence = [];
    const localVariables = new Map();

    // console.log("Main Text in Generate Text : " + incomingPreviewText);

    //Set the local variables into the incoming variables
    for (const [key, value] of incomingVariables.entries()) {
      localVariables.set(key, { ...value }); // Spread operator creates new object
    }
    // let text = tempPreviewText;

    //DEBUG LOG --------------------------------------------
    console.log("Generate Text () Log----------");
    console.log("incomingVariables: " + incomingVariables);
    console.log("Temp Preview Text: " + tempPreviewText);
    console.log("Temp Preview Text Size: " + tempPreviewText.length);
    console.log("Generated Sentence Amount: " + generatedSentenceAmount);
    // console.log("Text: " + text);
    console.log("-----------------------------");
    //-------------------------------------------

    //Generate the Sentences and pushes them into local generated sentence array
    let currentKeyIndex = 0;
    let tempFirstValue = null;
    let parsedText = [];
    let tempDate = new Date();
    for (let i = 0; i < generatedSentenceAmount; i++) {
      let generatedText = tempPreviewText;
      const variableEntries = Array.from(localVariables.entries());

      while (generatedText.includes("{}") && variableEntries.length > 0) {
        const [key, values] =
          variableEntries[currentKeyIndex % variableEntries.length];

        //If Randomize is True -------------------------------
        if (values.randomize) {
          switch (values.type) {
            case "Integer":
              values.displayText = getRandomInt(
                values.minValue,
                values.maxValue
              );
              break;

            case "List":
              values.displayText = getRandomfromList(values.list);
              break;
            case "Date":
              values.displayText = getRandomfromDate(
                values.minDateValue,
                values.maxDateValue
              );
              break;
            default:
              break;
          }
        }

        //If Iterate is True ----------------------------------
        else if (values.iterate) {
          switch (values.type) {
            case "Integer":
              values.displayText = parseInt(values.value);
              values.value = parseInt(values.value) + parseInt(values.interval);
              break;
            case "List":
              if (i === 0) {
                parsedText = values.list;
              }
              values.displayText = parsedText[i];
              break;
            case "Date":
              if (i === 0) {
                tempDate = new Date(values.dateValue);
              }
              values.displayText = tempDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              if (tempDate !== null) {
                tempDate = new Date(
                  tempDate.setDate(tempDate.getDate() + values.interval)
                );
              }

              break;
            default:
              break;
          }
        }

        //If Randomize and Iterate are false ----------------------------
        else {
          switch (values.type) {
            case "Integer":
              values.displayText = values.value;
              break;
            case "List":
              values.displayText = values.list;
              break;
            case "Date":
              values.displayText = values.dateValue.toLocaleString("en-US", {
                dateStyle: "long",
              });
              break;
            case "String":
              values.displayText = values.value;
              break;
            default:
              break;
          }
        }

        //Replace Each Variable Marker with Display Text Value
        generatedText = generatedText.replace("{}", String(values.displayText));

        //Increase the Index of Variable
        currentKeyIndex++;
      }

      console.log(`Generated Text: ${generatedText} with this order [${i}]`);

      //Push Generated Sentence into a List of Generated Sentence
      localGeneratedSentence.push(generatedText);
    }

    // setGeneratedSentenceAmount(0);
    // console.log("Break Text: " + text);
    //Passing the local generated sentence into the parent compoonents

    //Push the List into the Parent Component
    incomingHandleGeneratedSentenceChanges(localGeneratedSentence);
    console.log("GenerateSentence END OF LOG---------");
    return localGeneratedSentence;
  }

  // const breakincomingPreviewText = (text) => {
  //   const splitText = text.split("{}");
  //   return splitText;
  // };

  return (
    <>
      <div className={css["generator-container"]}>
        <input
          id={css["amount-field"]}
          type="number"
          onChange={(e) => {
            setInputValue(e.target.value);
            handleGeneratedSentenceAmountChanges(e.target.value);
          }}
          placeholder="Amount"
          value={inputValue}
        />
        <button id={css["generate-button"]} onClick={generateSentence}>
          Generate
        </button>
      </div>
    </>
  );
}

export default Generator;
