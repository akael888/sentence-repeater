import { useRef } from "react";
import Form from "react-bootstrap/Form";

function VarTableRowData({
  incomingKey,
  incomingValues,
  tableDataType,
  incomingchangedValues,
  incomingHandleVariableChanges,
  incomingCustomColorText = "main-color",
  incomingCustomBGColorText = "transparent",
}) {
 
  const editableRef = useRef();

  const TableRowFormatRef = {
    VarName: {
      type: () => "text",
      placeholder: () => "Input Var Name for Var " + incomingKey,
      widthCSS: () => 60,
    },
    VarStartValue: {
      type: () => {
        switch (incomingValues.type) {
          case "Integer":
            return "number";
          case "Date":
            return "date";
          case "List":
            return "text";
          default:
            return "text";
        }
      },
      placeholder: () => {
        switch (incomingValues.type) {
          case "Integer":
            return "Numbers Only";
          case "String":
            return "Strings Only";
          case "List":
            return "Strings with a space";
          default:
            return "text";
        }
      },
      widthCSS: () => 20,
    },
    VarInterval: {
      type: () => "number",
      placeholder: () => "Numbers Only",
      widthCSS: () => 100,
    },
    VarBoolean: {
      type: () => "checkbox",
      widthCSS: () => 50,
    },
  };

  // Get the current table format configuration
  const currentTableFormat = TableRowFormatRef[tableDataType];

  // Get the input type
  const getInputType = () => {
    return currentTableFormat?.type() || "text";
  };

  // Get the placeholder
  const getPlaceholder = () => {
    return currentTableFormat?.placeholder?.() || "";
  };

  // Get the current value based on the data type
  const getCurrentValue = () => {
    if (tableDataType === "VarBoolean") {
      return incomingValues[incomingchangedValues] || false;
    }

    if (tableDataType === "VarStartValue" && incomingValues.type === "Date") {
      return incomingValues[incomingchangedValues]
        ? incomingValues[incomingchangedValues].toISOString().split("T")[0]
        : "";
    }

    return incomingValues[incomingchangedValues] || "";
  };

  // Handle change events
  const handleChange = (e) => {
    let value = e.target.value;

    // Handle different data types
    if (tableDataType === "VarStartValue" && incomingValues.type === "Date") {
      value = value ? new Date(value) : null;
    }

    incomingHandleVariableChanges(incomingKey, incomingchangedValues, value);
  };

  // Handle click events (for checkboxes)
  const handleClick = (e) => {
    if (tableDataType === "VarBoolean") {
      const newValue = !incomingValues[incomingchangedValues];
      incomingHandleVariableChanges(
        incomingKey,
        incomingchangedValues,
        newValue
      );
    }
  };

  //Tailwind Styles
  let selectedWidthCSS = currentTableFormat?.widthCSS() || 100;

  //Var Input Data
  let tw_varInputData_sm = " sm:w-full";
  let tw_varInputData_md = " md:w-full";
  let tw_varInputData_lg = ` lg:w-[${selectedWidthCSS}%]`;
  let tw_varInputData_xl = ` xl:w-[${selectedWidthCSS}%]`;
  let tw_varInputDatar_2xl = ` 2xl:w-[${selectedWidthCSS}%]`;

  return (
    <>
      {tableDataType == "VarBoolean" ? (
        <Form>
          <Form.Check
            checked={getCurrentValue()}
            onClick={handleClick}
            type="switch"
            id="custom-switch"
            className="color  -opposite-color"
          />
        </Form>
      ) : (
        <input
          ref={editableRef}
          className={`w-full text-center bg-${incomingCustomBGColorText} text-${incomingCustomColorText} placeholder-sub-color shrink-1`}
          type={getInputType()}
          {...(tableDataType === "VarBoolean"
            ? {
                checked: getCurrentValue(),
                onClick: handleClick,
              }
            : {
                value: getCurrentValue(),
                onChange: handleChange,
                placeholder: getPlaceholder(),
              })}
        />
      )}
    </>
  );
}

export default VarTableRowData;
