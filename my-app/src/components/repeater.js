import { useRef, useState, useEffect } from "react";
import Variable from "./variable";
import Generator from "./generator";
import ShowResult from "./result";
import Preview from "./text-preview";
import css from "./repeater.module.css";
import TextInput from "./text-input";

function Repeater() {
  const [previewText, setPreviewText] = useState(); //For Text Preview
  const [variables, setVariables] = useState(new Map()); //To Count Each Variables
  const [generatedSentence, setGeneratedSentence] = useState([]); //For the created Sentences
  // const [mainText, setMainText] = useState("Input your Text");

  const handleTextArrayChanges = (textArrayData) => {
    setGeneratedSentence(textArrayData);
  };

  const handleMainTextChange = (text) => {
    console.log("handle Main Text Change :" + text);
    setPreviewText(text);
  };

  function handleInputTextChanges(text) {
    if (text) {
      handleMainTextChange(text);
    }
  }

  const handleVariableChanges = (passedVariable) => {
    setVariables(passedVariable);
  };

  // const handleMainTextBlur = () => {
  //   if (mainTextRef.current) {
  //     mainTextChange({ target: { value: mainTextRef.current.innerText } });
  //   }
  // };

  //disable any enter happening on main text
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       if (mainTextRef.current) {
  //         mainTextRef.current.removeAttribute("contenteditable");
  //       }
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => document.removeEventListener("keydown", handleKeyDown);
  // }, []);

  //enableEditing onclick
  // function enableEditing(element) {
  //   if (!element) return; // Prevent error if element is undefined
  //   element.setAttribute("contenteditable", true); //Add content editable
  //   element.focus(); //Focusing on the eelement
  // }

  // function addVariableOnInput(e) {
  //   const innerText = e.target.innerText;

  //   let searchPos = 0;
  //   let allBracketPositions = [];

  //   while (searchPos < innerText.length) {
  //     const bracketPos = innerText.indexOf("{}", searchPos);
  //     if (bracketPos === -1) break;
  //     allBracketPositions.push(bracketPos);
  //     searchPos = bracketPos + 1;
  //   }

  //   const newVariables = new Map();
  //   allBracketPositions.forEach((position, index) => {
  //     newVariables.set(index, {
  //       id: position,
  //       name: "Variable " + index,
  //       type: "Integer",
  //       value: index,
  //       iterate: true,
  //     });
  //   });

  //   setVariables(newVariables);
  // }

  return (
    <>
      <div className={css["all-container"]}>
        <div className={css["leftside-container"]}>
          <Preview mainText={previewText} variables={variables} />
          <div className={css["repeater-container"]}>
            <TextInput
              incomingText={previewText}
              TextChanges={handleInputTextChanges}
              incomingVariables={handleVariableChanges}
            />
            <Generator
              variables={variables}
              mainText={previewText}
              textArrayChanges={handleTextArrayChanges}
            />
          </div>
          <>
            <div className={css[["hidden-containers"]]}>
              <Variable
                variables={variables}
                variableChanges={handleVariableChanges}
              />
              {generatedSentence ? (
                <>
                  {generatedSentence.length > 0 ? (
                    <div className={css["results-container"]}>
                      <div className={css["content-div-results"]}>
                        {/* Content of the div */}
                        <ShowResult
                          arrayResults={generatedSentence}
                          arrayResultsChange={handleTextArrayChanges}
                        />
                      </div>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default Repeater;
