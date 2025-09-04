import { useRef, useState, useEffect } from "react";
import css from "./text-input.module.css";

function TextInput({

  incomingHandlePreviewTextChanges,
  incomingHandleVariablesChanges,

}) {

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
        minValue : index,
        maxValue : 10,
        iterate: true,
        interval: 1,
        randomize: false,
        displayText:"Display Text" //now that i think of it, should this be put inside a temp variable?
      });
    });

    incomingHandlePreviewTextChanges(innerText);
    console.log("preview text:" + innerText);
    incomingHandleVariablesChanges(newVariables);
  }

  // pass the contenteditable attribute when selected
  function enableEditing(element) {
    if (!element) return; // Prevent error if element is undefined
    element.setAttribute("contenteditable", true); //Add content editable
    element.focus(); //Focusing on the eelement
  }

  return (
    <>
      <div
        // contentEditable="true"
        className={css["main-text-container"]}
        onClick={(e) => enableEditing(e.target)}
        onInput={(e) => addVariableOnInput(e)}
      >
        Type here...
      </div>
    </>
  );
}
export default TextInput;
