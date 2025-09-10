import { useRef, useState, useEffect } from "react";
import css from "./text-input.module.css";

function TextInput({
  incomingHandlePreviewTextChanges,
  incomingHandleVariablesChanges,
}) {
  //Tailwind Styles

  //Text Input
  let tw_textInput_md = " md:w-[100%] md:p-[10px]";
  let tw_textInput_lg = " lg:w-[50%]";
  let tw_textInput_focus =
    " focus:bg-opposite-color focus:text-main-color focus:border focus:border-main-color focus:border-solid";
  let tw_textInput_hover =
    " hover:bg-opposite-color hover:text-main-color hover:border hover:border-main-color hover:border-solid";

  const [tempVariables, setTempVariables] = useState(new Map());
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

    const updatedVariables = new Map(tempVariables);

    allBracketPositions.forEach((position, index) => {
      if (!updatedVariables.has(index)) {
        updatedVariables.set(index, {
          id: position,
          name: "Variable " + index,
          type: "Integer",
          value: index,
          minValue: index,
          maxValue: 10,
          iterate: true,
          interval: 1,
          randomize: false,
          displayText: "Display Text", //now that i think of it, should this be put inside a temp variable?
        });
      }
    });

    if (allBracketPositions.length < updatedVariables.size) {
      console.log("Masuk Cut");
      console.log("Masuk Cut - All Bracket", allBracketPositions);
      console.log("Masuk Cut - updatedVariables", updatedVariables);
      updatedVariables.delete(updatedVariables.size - 1);
    }

    incomingHandlePreviewTextChanges(innerText);
    setTempVariables(updatedVariables);
    console.log("preview text:" + innerText);
    incomingHandleVariablesChanges(updatedVariables);
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
        className={
          "w-full h-full bg-main-color place-content-center border border-opposite-color cursor-text rounded-[10px] border-solid" +
          tw_textInput_hover +
          tw_textInput_focus
        }
        onClick={(e) => enableEditing(e.target)}
        onInput={(e) => addVariableOnInput(e)}
      >
        Type here...
      </div>
    </>
  );
}
export default TextInput;

//  // contentEditable="true"
//     className={
//       " h-full bg-main-color place-content-center border border-opposite-color cursor-text rounded-[10px] border-solid" +
//       tw_textInput_hover +
//       tw_textInput_focus +
//       tw_textInput_md +
//       tw_textInput_lg
//     }
