import { useRef, useState, useEffect } from "react";

function TextInput({ incomingText, TextChanges }) {
  const mainTextRef = useRef(null);
  const [mainText, setMainText] = useState("Input your Text");
  const [variables, setVariables] = useState(new Map());
  const [textArrayParent, setTextArrayParent] = useState([]);

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
        type: "Integer",
        value: index,
        iterate: true,
      });
    });

    setVariables(newVariables);
    handleMainTextBlur();
  }

  const mainTextChange = (event) => {
    setMainText(event.target.value);
    
  };

  const handleMainTextBlur = () => {
    if (mainTextRef.current) {
      console.log("Main Text Ref : " + mainTextRef.current.innerText);
      handleLocalTextChanges(mainTextRef.current.innerText);
    }
  };

  function enableEditing(element) {
    if (!element) return; // Prevent error if element is undefined
    element.setAttribute("contenteditable", true); //Add content editable
    element.focus(); //Focusing on the eelement
  }

  function handleLocalTextChanges(text) {
    console.log("Text : " + text);
    TextChanges(text);
  }

  return (
    <>
      <div>Test {incomingText}</div>
      <div
        // contentEditable="true"
        // className={css["main-text-container"]}
        // onBlur={handleMainTextBlur}
        ref={mainTextRef}
        onClick={() => enableEditing(mainTextRef.current)}
        onInput={(e) => addVariableOnInput(e)}
      >
        Type here...
      </div>
    </>
  );
}
export default TextInput;
