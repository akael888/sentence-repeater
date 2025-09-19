import { useEffect, useState } from "react";
import css from "./generator.module.css";
import { motion, scale } from "motion/react";

function Generator({
  incomingVariables,
  incomingPreviewText,
  incomingHandleGeneratedSentenceChanges,
  incomingHighestListVar,
}) {
  // Tailwind CSS

  //Generator
  let tw_generator_sm = " ";
  let tw_generator_md = " md:w-full";
  let tw_generator_lg = " lg:w-3/12";
  let tw_generator_xl = " ";
  let tw_generator_2xl = " ";

  let tw_generateButton_glassMorphBG = " bg-opposite-sub-color";
  let tw_inputAmount_hover =
    " hover:bg-[color:var(--opposite-color)] hover:text-[color:var(--main-color)] hover:border hover:border-[color:var(--main-color)] hover:border-solid";
  let tw_generateButton_hover =
    " hover:bg-[color:var(--main-color)] hover:text-[color:var(--opposite-color)]  hover:border-[color:var(--opposite-color)] ";

  const [generatedSentenceAmount, setGeneratedSentenceAmount] = useState(0);

  const [inputValue, setInputValue] = useState(0);

  let requiredFilled = inputValue != 0 && incomingPreviewText != "";

  useEffect(() => {
    let listTotalLength =
      incomingHighestListVar.list.length * incomingHighestListVar.interval;

    console.log(
      "List Before Total Len",
      listTotalLength,
      generatedSentenceAmount
    );

    setInputValue(listTotalLength || "");
    handleGeneratedSentenceAmountChanges(listTotalLength);
    console.log(
      "List After Total Len",
      listTotalLength,
      generatedSentenceAmount
    );
  }, [incomingHighestListVar.list.length, incomingHighestListVar.interval]);

  function handleGeneratedSentenceAmountChanges(amount) {
    console.log("AMount Generated Sentence: ", amount);
    setGeneratedSentenceAmount(amount);
    console.log("AMount Generated Sentence After: ", generatedSentenceAmount);
    console.log("==== AMount Generated Sentence");
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
    console.log(`Temp Preview Text:-${tempPreviewText}- `);
    console.log("Type Preview Text: " + typeof tempPreviewText);
    console.log(
      "incomingPreviewText !=  Preview Text: " + (incomingPreviewText != "")
    );
    console.log(
      "incomingPreviewText != null  Preview Text: " +
        (incomingPreviewText != null)
    );
    console.log(
      "incomingPreviewText != undefined  Preview Text: " +
        (incomingPreviewText != undefined)
    );
    console.dir(incomingPreviewText);
    console.log("Temp Preview Text Size: " + tempPreviewText.length);
    console.log("Generated Sentence Amount: " + generatedSentenceAmount);
    // console.log("Text: " + text);
    console.log("-----------------------------");
    //-------------------------------------------

    //Generate the Sentences and pushes them into local generated sentence array
    let currentKeyIndex = 0;
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
                let tempListContainer = [];
                let totalListLen = values.list.length * values.interval;
                for (let x = 0; x < totalListLen; x++) {
                  let listIndex = Math.floor(x / values.interval);
                  tempListContainer.push(values.list[listIndex]);
                  console.log(
                    "Temp List Parsed",
                    tempListContainer,
                    "and List Index :",
                    listIndex,
                    "mathfloor",
                    x / values.interval
                  );
                }
                values.listParsed = tempListContainer;
              }

              values.displayText = values.listParsed[i];

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
                  tempDate.setDate(
                    tempDate.getDate() + parseInt(values.interval)
                  )
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
      <div className="w-full h-auto grid  place-items-center">
        <div
          className={
            "w-full h-[100%] inline-flex max-w-[80%] [&>*]:max-w-[80%] place-content-center rounded-[10px]"
          }
        >
          <input
            className={
              "w-full h-full bg-[color:var(--main-color)] text-[color:var(--opposite-color)] text-center border border-[color:var(--opposite-color)] rounded-[10px] border-solid empty:bg-[color:var(--main-color)]" +
              tw_inputAmount_hover
            }
            type="number"
            onChange={(e) => {
              setInputValue(e.target.value);
              handleGeneratedSentenceAmountChanges(e.target.value);
            }}
            placeholder="Amount"
            value={inputValue}
            required="true"
          />
          <motion.div
            className={
              "w-full h-full grid place-items-center text-main-color animate-[scaleUp_2s_ease-in-out_infinite] rounded-[5px] border-[none] " +
              (requiredFilled
                ? tw_generateButton_glassMorphBG + tw_generateButton_hover
                : "bg-opposite-color")
            }
            whileTap={requiredFilled ? { scale: 0.9 } : { x: 10 }}
          >
            <motion.button
              className="w-full h-full p-[5px]"
              onClick={generateSentence}
              disabled={!requiredFilled}
            >
              Generate
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Generator;
