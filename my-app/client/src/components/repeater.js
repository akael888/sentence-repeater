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
  const [previewText, setPreviewText] = useState(() => {
    try {
      const stored = localStorage.getItem("CURRENT_PREVIEW_TEXT");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch (err) {
      console.error("Failed to parse preview text from localStorage:", err);
    }
    return "";
  }); //For Text Preview
  const [variables, setVariables] = useState(() => {
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
  }); //To Count Each Variables
  const [generatedSentence, setGeneratedSentence] = useState(() => {
    try {
      const stored = localStorage.getItem("CURRENT_GEN_SENTENCES");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch (err) {
      console.error(
        "Failed to parse generated sentence from localStorage:",
        err
      );
    }
    return [];
  }); //For the created Sentences
  const [highestListVar, setHighestListVar] = useState(() => {
    try {
      const stored = localStorage.getItem("CURRENT_HIGHEST_LIST_VAR");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch (err) {
      console.error("Failed to parse highest list var from localStorage:", err);
    }
    return { list: [] };
  });

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

  useEffect(() => {
    localStorage.setItem("CURRENT_PREVIEW_TEXT", JSON.stringify(previewText));
  }, [previewText]);
 
  useEffect(() => {
    localStorage.setItem(
      "CURRENT_HIGHEST_LIST_VAR",
      JSON.stringify(highestListVar)
    );
  }, [JSON.stringify(highestListVar)]);

  useEffect(() => {
    localStorage.setItem(
      "CURRENT_GEN_SENTENCES",
      JSON.stringify(generatedSentence)
    );
  }, [generatedSentence]);

  useEffect(() => {
    localStorage.setItem(
      "CURRENT_VARIABLES",
      JSON.stringify(Array.from(variables.entries()))
    );
  }, [variables]);

  const handleGeneratedSentenceChanges = (textArrayData) => {
    setGeneratedSentence(textArrayData);
  };

  const handlePreviewTextChanges = (text) => {
    setPreviewText(text);
  };

  const handleVariableChanges = (passedVariable) => {
    setVariables(new Map(passedVariable));
  };

  const handleHighestListVarChanges = (passedVariable) => {
    setHighestListVar(passedVariable);
  };

  return (
    <>
      <div className="w-[80dvw] grid place-items-center m-auto min-h-0 gap-[2vh]">
        <motion.div className="h-auto w-full grid place-self-center gap-[10px]">
          <Preview
            incomingPreviewText={previewText}
            incomingVariables={variables}
          />
        </motion.div>

        <motion.div
          className="h-auto w-full grid grid-rows-2 place-self-center gap-[10px]"
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
          <TextInput
            incomingPreviewText={previewText}
            incomingHandlePreviewTextChanges={handlePreviewTextChanges}
            incomingHandleVariablesChanges={handleVariableChanges}
            incomingVariables={variables}
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

        <motion.div className="grid w-full h-auto items-start content-start sm:gap-[10px] gap-[20px] sm:flex sm:flex-rows">
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
      </div>
    </>
  );
}

export default Repeater;
