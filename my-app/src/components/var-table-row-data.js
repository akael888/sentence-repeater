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
    },
    VarInterval: {
      type: () => {
        return "number";
      },
    },
    VarBoolean: {
      type: () => {
        return "toggle";
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

            console.log("EventCall Target Value:", eventCall.target.value)
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
        value={getTableRowDataAttribute("value", null)}
        onChange={(e) => getTableRowDataAttribute("onChange", e)}
      ></input>
    </>
  );
}

export default VarTableRowData;
