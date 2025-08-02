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

  const addVariable = (name, type, value) => {
    setVariables(() => {
      const newVariables = new Map(variables);
      newVariables.set(newVariables.size,{name, type, value});
      return newVariables;
    });
  };
  return (
    <>
      <div className="repeater-container">
        <div
          contentEditable="true"
          className="main-text-container"
          onBlur={handleMainTextBlur}
          ref={mainTextRef}
          onClick={() => enableEditing(mainTextRef.current)}
        >
          Type here...
        </div>
        <button
          onClick={() => addVariable("Variable 0", "Number", 1)}
        ></button>
        <h1>tEST</h1>
        {/* <textarea value={mainText} onChange={mainTextChange}></textarea> */}
      </div>
      <p>{mainTextRef.current?.innerText}</p>
      <Variable variables={variables}/>
    </>
  );
}

export default Repeater;
