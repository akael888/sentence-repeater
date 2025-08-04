import { useRef, useState, useEffect } from "react";
import Variable from "./variable";
import Generator from "./generator";
import ShowResult from "./result";
import Preview from "./text-preview";
import css from "./repeater.module.css";

function Repeater({ mainTextChange }) {
  const mainTextRef = useRef(null);
  const [variables, setVariables] = useState(new Map());
  const [textArrayParent, setTextArrayParent] = useState([]);

  const handleTextArrayChanges = (textArrayData) => {
    setTextArrayParent(textArrayData);
  };

  const handleMainTextBlur = () => {
    if (mainTextRef.current) {
      mainTextChange({ target: { value: mainTextRef.current.innerText } });
    }
  };

  //disable any enter happening on main text
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (mainTextRef.current) {
          mainTextRef.current.removeAttribute("contenteditable");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  //enableEditing onclick
  function enableEditing(element) {
    if (!element) return; // Prevent error if element is undefined
    element.setAttribute("contenteditable", true); //Add content editable
    element.focus(); //Focusing on the eelement
  }

  const handleVariableChanges = (passedVariable) => {
    setVariables(passedVariable);
  };

  function addVariableOnInput(e) {
    const innerText = e.target.innerText;

    let searchPos = 0;
    let allBracketPositions = [];

    while (searchPos < innerText.length) {
      const bracketPos = innerText.indexOf("{}", searchPos);
      if (bracketPos === -1) break;
      allBracketPositions.push(bracketPos);
      searchPos = bracketPos + 1;
    }

    const newVariables = new Map();
    allBracketPositions.forEach((position, index) => {
      newVariables.set(index, {
        id: position,
        name: "Variable " + index,
        type: "Number",
        value: index,
        iterate: true,
      });
    });

    setVariables(newVariables);
  }

  return (
    <>
      <div className={css["all-container"]}>
        <div className={css["leftside-container"]}>
          <div className={css["preview-container"]}>
            <Preview
              mainText={mainTextRef.current?.innerText}
              variables={variables}
            />
          </div>
          <div className={css["repeater-container"]}>
            <div
              // contentEditable="true"
              className={css["main-text-container"]}
              onBlur={handleMainTextBlur}
              ref={mainTextRef}
              onClick={() => enableEditing(mainTextRef.current)}
              onInput={(e) => addVariableOnInput(e)}
            >
              Type here...
            </div>
            <div className={css["generator-container"]}>
              <Generator
                variables={variables}
                mainText={mainTextRef}
                textArrayChanges={handleTextArrayChanges}
              />
            </div>
          </div>
          <div className={css["variable-container"]}>
            {variables.size > 0 ? (
              <div className="content-div">
                {/* Content of the div */}
                <Variable
                  variables={variables}
                  variableChanges={handleVariableChanges}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className={css["rightside-container"]}>
          {textArrayParent.length > 0 ? (
              <div className="content-div">
                {/* Content of the div */}
                <ShowResult arrayResults={textArrayParent} />
              </div>
            ) : null}
          
        </div>
      </div>
    </>
  );
}

export default Repeater;
