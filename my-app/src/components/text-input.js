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
    const textInput = e.target.value;

    // Search for {} in the text
    let searchPos = 0;
    let allBracketPositions = [];
    while (searchPos < textInput.length) {
      const bracketPos = textInput.indexOf("{}", searchPos);
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

    //delete variables
    if (allBracketPositions.length < updatedVariables.size) {
      console.log("Masuk Cut");
      console.log("Masuk Cut - All Bracket", allBracketPositions);
      console.log("Masuk Cut - updatedVariables", updatedVariables);
      updatedVariables.delete(updatedVariables.size - 1);
    }

    console.log("preview text: before enter" + textInput);
    incomingHandlePreviewTextChanges(textInput);
    setTempVariables(updatedVariables);
    console.log("preview text:" + textInput);
    incomingHandleVariablesChanges(updatedVariables);
  }

  
  
  // function enableEditing(element) {
  //   if (!element) return; 
  //   element.setAttribute("contenteditable", true); 
  //   element.focus();
  // }

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <input
          // contentEditable="true"
          className={
            "w-full h-[100%] max-w-[80%] text-center flex overflow-auto bg-main-color justify-center text-opposite-color items-center border border-opposite-color cursor-text rounded-[10px] border-solid p-[10px]" +
            tw_textInput_hover +
            tw_textInput_focus
          }
          placeholder="Type Text here.."
          // onClick={(e) => enableEditing(e.target)}
          onChange={(e) => addVariableOnInput(e)}
        >
          
        </input>
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
