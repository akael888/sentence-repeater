import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import css from "./variable.module.css";

function VariableTable({ incomingVariables, incomingHandlevariableChanges }) {
  // const initializedName = useRef(new Set());
  const [typeValidator, setTypeValidator] = useState({
    Integer: false,
    String: false,
    Date: false,
    List: false,
  });

  function handleincomingHandleVariableChanges(key, field, value) {
    const tempVarMap = new Map(incomingVariables);
    const targetVar = tempVarMap.get(key);
    if (targetVar) {
      targetVar[field] = value;
      tempVarMap.set(key, targetVar);
      if (field === "type") {
        processLocalVariableTypeChanges(key, value, targetVar, tempVarMap);
      }
    }
    console.log("tempvarMap key: " + key);

    return incomingHandlevariableChanges(tempVarMap);
  }

  useEffect(() => {
    if (incomingVariables) {
      let typeList = null;
      typeList = Array.from(incomingVariables.values()).map(
        (variable) => variable.type
      );
      console.log(typeList.type);
      setTypeValidator({
        Integer: typeList.includes("Integer"),
        String: typeList.includes("String"),
        Date: typeList.includes("Date"),
        List: typeList.includes("List"),
      });
    }

    // return typeList.includes("Integer");
  }, [incomingVariables]);

  function processLocalVariableTypeChanges(
    key,
    typeValue,
    incomingTargetVar,
    incomingVarMap
  ) {
    const tempVarMap = new Map(incomingVarMap);
    switch (typeValue) {
      case "Integer":
        incomingTargetVar.iterate = true;
        incomingTargetVar.interval = 0;
        incomingTargetVar.randomize = false;
        incomingTargetVar.value = 0;
        // tempTypeValidator.Integer = true;
        break;
      case "String":
        incomingTargetVar.iterate = false;
        incomingTargetVar.interval = null;
        incomingTargetVar.randomize = null;
        incomingTargetVar.value = "String Here";
        // tempTypeValidator.String = true;
        break;
      case "Date":
        console.log("Date");
        // tempTypeValidator.Date = true;
        break;
      case "List":
        console.log("List");
        // tempTypeValidator.List = true;
        break;
      default:
        break;
    }
  }

  return (
    <>
      {incomingVariables.size ? (
        <>
          {incomingVariables.size > 0 ? (
            <div className={css["variable-container"]}>
              <table className={css["variable-table-name"]}>
                <thead className={css["thead-name"]}>
                  <tr>
                    {/* <th>id</th> */}
                    <th>Variable Name</th>
                    <th>Type</th>
                    <th>Start Value</th>
                    <th>Iterate</th>
                    <>
                      {typeValidator.Integer ? (
                        <th>Inteval</th>
                      ) : null}
                    </>
                    <>
                      {typeValidator.Integer ? (
                        <th>Randomize</th>
                      ) : null}
                    </>
                  </tr>
                </thead>
                <tbody className={css["tbody-name"]}>
                  {incomingVariables != null
                    ? Array.from(incomingVariables.entries()).map(
                        ([key, values]) => (
                          <tr key={key}>
                            {/* <td>{values.id}</td> */}
                            <td
                              contentEditable="true"
                              onBlur={(e) =>
                                handleincomingHandleVariableChanges(
                                  key,
                                  "name",
                                  e.target.innerText
                                )
                              }
                              className={css["td-var-name"]}
                            >
                              {values.name}
                            </td>

                            <td className={css["td-var-type"]}>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="secondary"
                                  id="dropdown-basic"
                                >
                                  {values.type}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    // href="#/action-1"
                                    onClick={() =>
                                      handleincomingHandleVariableChanges(
                                        key,
                                        "type",
                                        "Integer"
                                      )
                                    }
                                  >
                                    Integer
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    // href="#/action-2"
                                    onClick={() =>
                                      handleincomingHandleVariableChanges(
                                        key,
                                        "type",
                                        "String"
                                      )
                                    }
                                  >
                                    String
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>{" "}
                            </td>
                            <td
                              contentEditable="true"
                              onBlur={(e) =>
                                handleincomingHandleVariableChanges(
                                  key,
                                  "value",
                                  e.target.innerText
                                )
                              }
                              className={css["td-var-value"]}
                            >
                              {values.value}
                            </td>
                            <td
                              contentEditable="true"
                              className={css["td-var-iterate"]}
                            >
                              <div>
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={values.iterate}
                                    onClick={() =>
                                      handleincomingHandleVariableChanges(
                                        key,
                                        "iterate",
                                        !values.iterate
                                      )
                                    }
                                  />
                                </label>
                              </div>
                            </td>
                            <>
                              {values.type === "Integer" ? (
                                <td>Inteval</td>
                              ) : null}
                            </>
                            <>
                              {values.type === "Integer" ? (
                                <td>Randomize</td>
                              ) : null}
                            </>
                          </tr>
                        )
                      )
                    : !(<div>empty</div>)}
                </tbody>
              </table>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default VariableTable;
