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

  const addVariable = (iname, itype, ivalue, iloc) => {
    setVariables(() => {
      const newVariables = new Map(variables);
      newVariables.set(newVariables.size, {
        name: iname,
        type: itype,
        value: ivalue,
        loc: iloc,
      });
      console.log("New Variables :" + newVariables.size);
      console.log("loc :" + newVariables.get(newVariables.size - 1).loc);
      return newVariables;
    });
  };

  const removeVariable = (index) => {
    setVariables((prevVariables) => {
      const newVariables = new Map(prevVariables);
      newVariables.delete(index);
      // Re-index the variables after deletion
      const reindexedVariables = new Map();
      let i = 0;
      for (const [key, value] of newVariables.entries()) {
        reindexedVariables.set(i++, value);
      }
      return reindexedVariables;
    });
  };

  function addVariableOnInput(e) {
    // let tempVariable = new Map(variables);
    const innerText = e.target.innerText;
    let innerTextSize = innerText.length;
    console.log("Inner Text Size: " + innerTextSize);
    let tempElementText = innerText;
    let lastLoc = variables.get(variables.size - 1)?.loc || 0;

    // Debug the variables state
    console.log("Variables size:", variables.size);
    if (variables.size > 0) {
      console.log("Last variable:", variables.get(variables.size - 1));
      if (lastLoc + 1 > innerTextSize) {
        console.log("Remove last variable due to size mismatch");
        removeVariable(variables.size - 1);
      }
    }

    let lastArray =
      variables.size > 0 ? variables.get(variables.size - 1).loc + 1 : 0;

    // if (tempVariable.size > 0) {
    //   tempElementText = innerText.slice(() => {
    //     let sum = 0;
    //     tempVariable.forEach((value) => {
    //       sum += value.loc;
    //     });
    //     return sum + 1;
    //   });
    //   console.log(
    //     "Temp Variable Array: " +
    //       (tempVariable.get(tempVariable.size - 1).loc + 1)
    //   );
    // } else tempElementText = innerText;

    console.log("ELEMENT TEXT: " + tempElementText);
    console.log("last array awal: " + lastArray);
    if (tempElementText.indexOf("{", lastArray) !== -1) {
      console.log("found {");
      if (
        tempElementText[tempElementText.indexOf("{", lastArray) + 1] === "}"
      ) {
        console.log("found {}");
        const currentSize = variables.size;
        const currentLoc = tempElementText.indexOf("}", lastArray);
        console.log("current loc: " + currentLoc);
        addVariable(currentSize, "Number", 1, currentLoc);

        console.log("varible terakhir : " + currentLoc);
        console.log("last array: " + lastArray);
        lastArray = currentLoc + 1;
        console.log("last array: " + lastArray);
      }
    } else console.log("no {}");
    //mainTextRef.current = handleMainTextBlur;
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
        <button
          onClick={() => addVariable("Variable 0", "Number", 1, 2)}
        ></button>
        <h1>tEST</h1>
        {/* <textarea value={mainText} onChange={mainTextChange}></textarea> */}
      </div>
      <p>{mainTextRef.current?.innerText}</p>
      <Variable variables={variables} />
    </>
  );
}

export default Repeater;
