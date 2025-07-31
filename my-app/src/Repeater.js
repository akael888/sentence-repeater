import { useRef } from "react";

function Repeater({ mainText, mainTextChange }) {
  const mainTextRef = useRef(null);

  const handleMainTextBlur = () => {
    if (mainTextRef.current) {
      mainTextChange({ target: { value: mainTextRef.current.innerText } });
    }
  };

  //disable any enter happening on main text
  document.onkeydown = function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector(".main-text-container").removeAttribute("contenteditable");
    }
  };

  //enableEditing onclick
  function enableEditing(element) {
    if (!element) return; // Prevent error if element is undefined
    element.setAttribute("contenteditable", true); //Add content editable
    element.focus(); //Focusing on the eelement
  }

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
        {/* <textarea value={mainText} onChange={mainTextChange}></textarea> */}
      </div>
      <p>{mainTextRef.current?.innerText}</p>
      <div className="variable-container">
        <table>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Test 1</td>
              <td>Test 2</td>
              <td>Test 3</td>
            </tr>
            <tr>
              <td>Test 1</td>
              <td>Test 2</td>
              <td>Test 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Repeater;
