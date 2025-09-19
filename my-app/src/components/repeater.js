import { useRef, useState, useEffect } from "react";
import VariableTable from "./variable-table";
import Generator from "./generator";
import ShowResult from "./result";
import Preview from "./text-preview";
// import css from "./repeater.module.css";
import TextInput from "./text-input";
import { motion } from "motion/react";
import VariableModal from "./var-modal";

function Repeater() {
  const [previewText, setPreviewText] = useState(""); //For Text Preview
  const [variables, setVariables] = useState(new Map()); //To Count Each Variables
  const [generatedSentence, setGeneratedSentence] = useState([]); //For the created Sentences
  const [highestListVar, setHighestListVar] = useState({ list: [] });

  //to update changes within the generated sentence in the parent component

  //tailwind css
  //input containers
  let tw_inputContainers_sm = " sm:grid";
  let tw_inputContainers_md =
    " md:grid md:w-full md:h-full md:content-center md:grid-row-2 md:place-content-center";
  let tw_inputContainers_lg =
    " :lg:inline-flex lg:w-screen lg:h-full lgalign-center lg:justify-center lg:m-auto lg:shrink-1";
  let tw_inputContainers_xl = " ";
  let tw_inputContainers_2xl = " ";

  //hidden containers
  let tw_hiddenContainers_sm = " sm:grid sm:content-center sm:gap-[1vh]";
  let tw_hiddenContainers_md = " md:grid md:content-center md:gap-[1vh]";
  let tw_hiddenContainers_lg = " lg:grid lg:content-center lg:gap-[1vh]";
  let tw_hiddenContainers_xl = " xl:grid xl:content-center xl:gap-[1vh]";
  let tw_hiddenContainers_2xl =
    " 2xl:w-screen 2xl:align-center 2xl:justify-center 2xl:place-items-start 2xl:gap-[5vw] 2xl:flex 2xl:shrink-1";

  useEffect(() => {
    if (variables.size === 0) {
      setHighestListVar({ list: [] });
    }
  }, [variables.size]);

  const handleGeneratedSentenceChanges = (textArrayData) => {
    setGeneratedSentence(textArrayData);
  };

  const handlePreviewTextChanges = (text) => {
    if (text) {
      setPreviewText(text);
    }
  };

  const handleVariableChanges = (passedVariable) => {
    setVariables(passedVariable);
  };

  const handleHighestListVarChanges = (passedVariable) => {
    setHighestListVar(passedVariable);
  };

  return (
    <>
      <div
        className={`w-[80vw] grid place-items-center m-auto h-full gap-[2vh]`}
      >
        <motion.div
          className="h-auto w-full h-full grid  place-self-center gap-[10px] z-[1]"
          
        >
          <Preview
            incomingPreviewText={previewText}
            incomingVariables={variables}
          />
        </motion.div>
        <motion.div
          className={
            "h-auto w-full grid grid-rows-2 place-self-center gap-[10px] "
          }
          initial={{ opacity: 0, y: -100, height: 0 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          {/*Kurang Animasi*/}
          <TextInput
            incomingHandlePreviewTextChanges={handlePreviewTextChanges}
            incomingHandleVariablesChanges={handleVariableChanges}
          />
          <Generator
            incomingVariables={variables}
            incomingPreviewText={previewText}
            incomingHandleGeneratedSentenceChanges={
              handleGeneratedSentenceChanges
            }
            incomingHighestListVar={highestListVar}
          />
        </motion.div>
        <>
          <motion.div
            className={
              "grid w-full h-full  items-center content-center gap-[30px]"
            }
          >
            <VariableTable
              incomingVariables={variables}
              incomingHandlevariableChanges={handleVariableChanges}
              incomingHandleHighestListVar={handleHighestListVarChanges}
              incomingHighestListVar={highestListVar}
            />
            <ShowResult
              arrayResults={generatedSentence}
              arrayResultsChange={handleGeneratedSentenceChanges}
            />
          </motion.div>
        </>
      </div>
    </>
  );
}

export default Repeater;

// "w-screen min-h-screen flex bg-center bg-repeat justify-center overflow-hidden text-opposite-color shrink-1"
