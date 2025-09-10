import { useRef, useState, useEffect } from "react";
import VariableTable from "./variable-table";
import Generator from "./generator";
import ShowResult from "./result";
import Preview from "./text-preview";
// import css from "./repeater.module.css";
import TextInput from "./text-input";
import bg from "../img/background-img.jpg";

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
      <div
        className="w-screen min-h-screen flex bg-center bg-repeat justify-center overflow-hidden text-opposite-color"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="w-screen grid place-items-center m-auto gap-[30px]">
          <Preview
            incomingPreviewText={previewText}
            incomingVariables={variables}
          />
          <div className="inline-flex w-[50%] h-full m-auto gap-[20px]">
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
          </div>
          <>
            <div className="w-fit flex align-center justify-center place-items-start gap-[10vh]">
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
