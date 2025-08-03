import { useRef, useState } from "react";
import Variable from "./variable";

function Repeater({ mainTextChange }) {
  const mainTextRef = useRef(null);
  const [variables, setVariables] = useState(new Map());

  const handleMainTextBlur = () => {
    if (mainTextRef.current) {
      mainTextChange({ target: { value: mainTextRef.current.innerText } });
    }
  };

  //disable any enter happening on main text
  document.onkeydown = function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document
        .querySelector(".main-text-container")
        .removeAttribute("contenteditable");
    }
  };

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
      });
    });

    setVariables(newVariables);
  }
  return (
    <>
      <div className="repeater-container">
        <div
          // contentEditable="true"
          className="main-text-container"
          onBlur={handleMainTextBlur}
          ref={mainTextRef}
          onClick={() => enableEditing(mainTextRef.current)}
          onInput={(e) => addVariableOnInput(e)}
        >
          Type here...
        </div>
      </div>
      <p>{mainTextRef.current?.innerText}</p>
      <Variable variables={variables} variableChanges={handleVariableChanges} />
    </>
  );
}

export default Repeater;
