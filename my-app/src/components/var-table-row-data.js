import { useRef } from "react";

function VarTableRowData({
  incomingKey,
  incomingValues,
  tableDataType,
  incomingchangedValues,
  incomingHandleVariableChanges,
}) {
  const editableRef = useRef();

  const TableRowFormatRef = {
    VarName: { type: "text", VarRef: "name" },
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
      VarRef: "value",
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
        return result?.type();
      case "value":
        switch (valueType) {
          case "Integer":
            return incomingValues.value;
          case "Date":
            return incomingValues.dateValue
              ? incomingValues.dateValue.toISOString().split("T")[0]
              : "";
          case "List":
            return incomingValues.value;
          default:
            break;
        }
        break;
      case "onChange":
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
          default:
            break;
        }
        break;
      default:
        return null;
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
