import { useState, useEffect, useCallback } from "react";
import VariableTable from "./variable-table";
import Generator from "./generator";
import ShowResult from "./result";
import Preview from "./text-preview";
// import css from "./repeater.module.css";
import TextInput from "./text-input";
import { motion } from "motion/react";
// import VariableModal from "./var-modal";
import BackEndDebugger from "./back-end-debugger";
import { useRepeaterData } from "./repeater-context";

function Repeater({ currentLink }) {
  const {
    previewText,
    variables,
    generatedSentence,
    highestListVar,
    handlePreviewTextChanges,
    handleVariableChanges,
    handleGeneratedSentenceChanges,
    handleHighestListVarChanges,
  } = useRepeaterData();

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
{/* 
        <BackEndDebugger
          incomingPreviewText={previewText}
          incomingVariables={variables}
          currentLink={currentLink}
          incomingHandlePreviewTextChanges={handlePreviewTextChanges}
          incomingHandleVariableChanges={handleVariableChanges}
        ></BackEndDebugger> */}
      </div>
    </>
  );
}

export default Repeater;
