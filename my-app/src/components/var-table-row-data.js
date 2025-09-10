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
      widthCSS: () => {
        return 20;
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
            return "Numbers Only";
          case "String":
            return "Strings Only";
          case "List":
            return "Strings with a space";
          default:
            return "text";
        }
      },
      widthCSS: () => {
        return 20;
      },
    },
    VarInterval: {
      type: () => {
        return "number";
      },
      placeholder: () => {
        return "Numbers Only";
      },
      widthCSS: () => {
        return 100;
      },
    },
    VarBoolean: {
      type: () => {
        return "checkbox";
      },
      widthCSS: () => {
        return 50;
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

  //Tailwind Styles
  let selectedWidthCSS = selectedTableData().widthCSS();

  //Var Input Data
  let tw_varInputData_sm = " sm:w-full";
  let tw_varInputData_md = " md:w-full";
  let tw_varInputData_lg =  ` lg:w-[${selectedWidthCSS}%]`;
  let tw_varInputData_xl = ` xl:w-[${selectedWidthCSS}%]`;
  let tw_varInputDatar_2xl = ` 2xl:w-[${selectedWidthCSS}%]`;

  return (
    <>
      <input
        ref={editableRef}
        className={`${tw_varInputData_md} ${tw_varInputData_lg} ${tw_varInputData_xl} ${tw_varInputData_sm} ${tw_varInputDatar_2xl} text-center bg-transparent text-white placeholder-sub-color shrink-1`}
        type={getTableRowDataAttribute("type", null)}
        {...(tableDataType == "VarBoolean"
          ? {
              checked: getTableRowDataAttribute("value", null),
              onClick: (e) => getTableRowDataAttribute("onClick", e),
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
