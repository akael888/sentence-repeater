import { useRef, useState, useEffect } from "react";
import VariableTable from "./variable-table";
import Generator from "./generator";
import ShowResult from "./result";
import Preview from "./text-preview";
import css from "./repeater.module.css";
import TextInput from "./text-input";

function Repeater() {
  const [previewText, setPreviewText] = useState(""); //For Text Preview
  const [variables, setVariables] = useState(new Map()); //To Count Each Variables
  const [generatedSentence, setGeneratedSentence] = useState([]); //For the created Sentences
  const [highestListVar, setHighestListVar] = useState({ list: [] });

  //to update changes within the generated sentence in the parent component

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
      <div className="h-screen w-screen bg-red">
        <div className={css["leftside-container"]}>
          <Preview
            incomingPreviewText={previewText}
            incomingVariables={variables}
          />
          <div className={css["repeater-container"]}>
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
          </div>
          <>
            <div className="flex flex-row items-start bg-black place-items-start gap-[10vh]">
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
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default Repeater;
