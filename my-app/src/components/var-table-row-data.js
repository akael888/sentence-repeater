import { useRef } from "react";

function VarTableRowData({
  incomingKey,
  incomingValues,
  tableDataType,
  incomingchangedValues,
  incomingHandleVariableChanges,
}) {
  const editableRef = useRef();
  let selectedKey = null;

  const TableRowFormatRef = {
    VarName: {
      type: () => {
        return "text";
      },
      placeholder: () => {
        return "Input Var Name for Var " + incomingKey;
      },
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
            return "Enter Number Here..";
          case "String":
            return "Enter String Here..";
          case "List":
            return "Enter a Text and then press Space";
          default:
            return "text";
        }
      },
    },
    VarInterval: {
      type: () => {
        return "number";
      },
      placeholder: () => {
        return "Enter Interval Number Here..";
      },
    },
    VarBoolean: {
      type: () => {
        return "checkbox";
      },
    },
  };

  const selectedTableData = () => {
    console.log(`TableRowFormatRef: `, TableRowFormatRef);
    for (const key in TableRowFormatRef) {
      console.log(
        `TableRowFormatRefKey: `,
        TableRowFormatRef[key],
        "Key:",
        key
      );
      if (tableDataType == key) {
        console.log(`TableRowFormatRefKeyIf: `, TableRowFormatRef[key]);
        selectedKey = key;
        return TableRowFormatRef[key];
      }
    }
  };

  function getTableRowDataAttribute(attributeType, eventCall) {
    let valueType = incomingValues.type;
    let result = null;

    switch (attributeType) {
      case "type":
        result = selectedTableData();
        console.log("type:", result?.type(), "selectedkey", selectedKey);
        return result?.type();
      case "value":
        if (selectedKey == "VarName") {
          console.log(
            "varname incoming changed values :",
            incomingValues[incomingchangedValues]
          );
          return incomingValues[incomingchangedValues];
        } else if (selectedKey == "VarInterval") {
          return incomingValues[incomingchangedValues];
        } else if (selectedKey == "VarBoolean") {
          return incomingValues[incomingchangedValues];
        } else {
          switch (valueType) {
            case "Integer":
              return incomingValues[incomingchangedValues];
            case "Date":
              return incomingValues[incomingchangedValues]
                ? incomingValues[incomingchangedValues]
                    .toISOString()
                    .split("T")[0]
                : "";
            case "List":
              return incomingValues.value;
            case "String":
              return incomingValues.value;
            default:
              return incomingValues.incomingchangedValues;
          }
        }
      case "onChange":
        if (selectedKey == "VarName") {
          result = () =>
            incomingHandleVariableChanges(
              incomingKey,
              incomingchangedValues,
              eventCall.target.value
            );
          return result();
        } else if (selectedKey == "VarInterval") {
          result = () =>
            incomingHandleVariableChanges(
              incomingKey,
              incomingchangedValues,
              eventCall.target.value
            );

          console.log("EventCall Target Value:", eventCall.target.value);
          return result();
        } else if (selectedKey == "VarBoolean") {
          result = () =>
            incomingHandleVariableChanges(
              incomingKey,
              incomingchangedValues,
              !incomingValues[incomingchangedValues]
            );

          console.log("EventCall Target Value:", eventCall.target.value);
          return result();
        } else {
          switch (valueType) {
            case "Integer":
              result = () => {
                return incomingHandleVariableChanges(
                  incomingKey,
                  incomingchangedValues,
                  eventCall.target.value
                );
              };
              return result();
            case "Date":
              result = () => {
                const selectedDate = eventCall.target.value
                  ? new Date(eventCall.target.value)
                  : null;

                return incomingHandleVariableChanges(
                  incomingKey,
                  incomingchangedValues,
                  selectedDate
                );
              };

              return result();
            case "List":
              result = () => {
                return incomingHandleVariableChanges(
                  incomingKey,
                  incomingchangedValues,
                  eventCall.target.value
                );
              };
              return result();
            case "String":
              result = () => {
                return incomingHandleVariableChanges(
                  incomingKey,
                  incomingchangedValues,
                  eventCall.target.value
                );
              };
              return result();
            default:
              break;
          }
        }
        break;
      case "onClick":
        if (selectedKey == "VarBoolean") {
          result = () =>
            incomingHandleVariableChanges(
              incomingKey,
              incomingchangedValues,
              !incomingValues[incomingchangedValues]
            );

          console.log("EventCall Target Value:", eventCall.target.value);
          return result();
        } else return null;
      case "placeholder":
        result = selectedTableData();
        return result?.placeholder();
      default:
        result = () => {
          return incomingHandleVariableChanges(
            incomingKey,
            incomingchangedValues,
            eventCall.target.value
          );
        };
        return result();
    }
  }
  return (
    <>
      <input
        ref={editableRef}
        type={getTableRowDataAttribute("type", null)}
        {...(tableDataType == "VarBoolean"
          ? {
              checked: getTableRowDataAttribute("value", null),
              onChange: (e) => getTableRowDataAttribute("onChange", e),
            }
          : {
              value: getTableRowDataAttribute("value", null),
              onChange: (e) => getTableRowDataAttribute("onChange", e),
              placeholder: getTableRowDataAttribute("placeholder", null),
            })}
        // value={getTableRowDataAttribute("value", null)}
        // {...(tableDataType == "VarBoolean"
        //   ? { checked: getTableRowDataAttribute("value", null) }
        //   : { value: getTableRowDataAttribute("value", null) })}
        // onChange={(e) => getTableRowDataAttribute("onChange", e)}
      ></input>
    </>
  );
}

export default VarTableRowData;
