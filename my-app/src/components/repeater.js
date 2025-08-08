import { useRef, useState, useEffect } from "react";
import Variable from "./variable";
import Generator from "./generator";
import ShowResult from "./result";
import Preview from "./text-preview";
import css from "./repeater.module.css";
import TextInput from "./textInput";

function Repeater() {
  const [previewText, setPreviewText] = useState(); //For Text Preview
  const [variables, setVariables] = useState(new Map()); //To Count Each Variables
  const [textArrayParent, setTextArrayParent] = useState([]); //For the array created from writing the text?
  // const [mainText, setMainText] = useState("Input your Text");

  const handleTextArrayChanges = (textArrayData) => {
    setTextArrayParent(textArrayData);
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
          <div className={css["preview-container"]}>
            <Preview mainText={previewText} variables={variables} />
          </div>
          <div className={css["repeater-container"]}>
            <TextInput
              incomingText={previewText}
              TextChanges={handleInputTextChanges}
              incomingVariables={handleVariableChanges}
            />
            {/* <div
              // contentEditable="true"
              className={css["main-text-container"]}
              onBlur={handleMainTextBlur}
              ref={mainTextRef}
              onClick={() => enableEditing(mainTextRef.current)}
              onInput={(e) => addVariableOnInput(e)}
            >
              Type here...
            </div> */}

            <div className={css["generator-container"]}>
              <Generator
                variables={variables}
                mainText={previewText}
                textArrayChanges={handleTextArrayChanges}
              />
            </div>
          </div>

          <>
            <div className={css[["hidden-containers"]]}>
              {variables ? (
                <>
                  {variables.size > 0 ? (
                    <div className={css["variable-container"]}>
                      <div className={css["content-div"]}>
                        {/* Content of the div */}
                        <Variable
                          variables={variables}
                          variableChanges={handleVariableChanges}
                        />
                      </div>
                    </div>
                  ) : null}
                </>
              ) : null}
              {textArrayParent ? (
                <>
                  {textArrayParent.length > 0 ? (
                    <div className={css["results-container"]}>
                      <div className={css["content-div-results"]}>
                        {/* Content of the div */}
                        <ShowResult
                          arrayResults={textArrayParent}
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
