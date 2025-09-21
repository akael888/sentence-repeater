import { useRef, useState, useEffect, use } from "react";
import css from "./text-input.module.css";

function TextInput({
  incomingHandlePreviewTextChanges,
  incomingHandleVariablesChanges,
  incomingVariables,
}) {
  //Tailwind Styles

  //Text Input
  let tw_textInput_md = " md:w-[100%] md:p-[10px]";
  let tw_textInput_lg = " lg:w-[50%]";
  let tw_textInput_focus =
    " focus:bg-opposite-color focus:text-main-color focus:border focus:border-main-color focus:border-solid";
  let tw_textInput_hover =
    " hover:bg-opposite-color hover:text-main-color hover:border hover:border-main-color hover:border-solid";
  let incomVarSize =
    incomingVariables != undefined ? incomingVariables.size : 0;

  const [tempVariables, setTempVariables] = useState(new Map());

  function addVariableOnInput(e) {
    const textInput = e.currentTarget.value;
    incomingHandlePreviewTextChanges(textInput);
    // Search for {} in the text
    if (textInput.includes("{}") || incomVarSize != 0) {
      let searchPos = 0;
      let allBracketPositions = [];
      console.log("bracket size before:" + allBracketPositions.length);

      while (searchPos < textInput.length) {
        const bracketPos = textInput.indexOf("{}", searchPos);
        if (bracketPos === -1) break;
        allBracketPositions.push(bracketPos + 1);
        searchPos = bracketPos + 1;
      }
      let updatedVariables = new Map(incomingVariables);

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
        while (allBracketPositions.length < updatedVariables.size) {
          updatedVariables = deleteLatestVar(updatedVariables);
          incomingHandleVariablesChanges(updatedVariables);
          // console.log(incomingVariables.size);
        }
      } else incomingHandleVariablesChanges(updatedVariables);
    }
  }

  function deleteLatestVar(updatedVariables) {
    if (incomingVariables.size === 0) return;

    const lastKey = Array.from(updatedVariables.keys()).pop();
    if (lastKey !== undefined) {
      updatedVariables.delete(lastKey);
      console.log("Updated Var Deleted : " + updatedVariables);
      console.log(updatedVariables);
      // setTempVariables(tempMap);
      // incomingHandleVariablesChanges(updatedVariables);
      return updatedVariables;
    }
    // console.log("pakeEko");
    // setTempVariables(incomingVariables);

    // setTempVariables(tempVariables[tempVariables.size - 1);
    // // console.log(updatedVariables);
    // console.log("---------------");
    // incomingHandleVariablesChanges(setTempVariables);
    // console.log(incomingVariables);
  }

  // useEffect(() => {
  //   //delete variables
  // }, [incomVarSize]);

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
          type="text"
        ></input>
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
