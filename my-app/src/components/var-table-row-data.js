import { useRef } from "react";
// import Form from "react-bootstrap/Form";
import CustomToggle from "./toggle-custom";

function VarTableRowData({
  incomingKey,
  incomingValues,
  tableDataType,
  incomingchangedValues,
  incomingHandleVariableChanges,
  incomingCustomColorText,
  incomingCustomBGColorText = "transparent",
}) {
  const editableRef = useRef();

  const TableRowFormatRef = {
    VarName: {
      type: () => "text",
      placeholder: () => "Input String as a Var Name ",
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
            return "Strings with a double space";
          default:
            return "text";
        }
      },
    },
    VarInterval: {
      type: () => "number",
      placeholder: () => "Numbers Only",
    },
    VarBoolean: {
      type: () => "checkbox",
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

  return (
    <>
      {tableDataType == "VarBoolean" ? (
        <CustomToggle
          checked={getCurrentValue()}
          onClick={handleClick}
        ></CustomToggle>
      ) : (
        <input
          ref={editableRef}
          className={`w-full text-center placeholder-sub-color bg-opacity-10 rounded-1 hover:shadow-[0_0_50px_rgba(100,100,100,0.5)] hover:!bg-black hover:!bg-opacity-10`}
          style={{
            backgroundColor:
              incomingCustomBGColorText === "transparent"
                ? "transparent"
                : `${incomingCustomBGColorText}1a`, // 1a is ~10% opacity in hex
            color: incomingCustomColorText,
          }}
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
