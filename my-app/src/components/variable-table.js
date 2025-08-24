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

  const [otherValidator, setOtherValidator] = useState({
    Random: false,
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
      if (field === "iterate" || field === "randomize") {
        let selectedField = field;
        let inverseField =
          selectedField === "iterate" ? "randomize" : "iterate";
        if (targetVar[inverseField] === true) {
          targetVar[inverseField] = false;
          tempVarMap.set(key, targetVar);
        }
      }
      // if (field === "iterate" && targetVar["randomize"] === true) {
      //   targetVar["randomize"] = false;
      //   tempVarMap.set(key, targetVar);
      // } else if (field === "randomize" && targetVar["iterate"] === true) {
      //   targetVar["iterate"] = false;
      //   tempVarMap.set(key, targetVar);
      // }
    }
    console.log("tempvarMap key: " + key);

    return incomingHandlevariableChanges(tempVarMap);
  }

  useEffect(() => {
    if (incomingVariables) {
      let validatorList = null;
      validatorList = Array.from(incomingVariables.values()).map(
        (variable) => variable.type
      );
      console.log("Type :" + validatorList);
      setTypeValidator({
        Integer: validatorList.includes("Integer"),
        String: validatorList.includes("String"),
        Date: validatorList.includes("Date"),
        List: validatorList.includes("List"),
      });
      validatorList = Array.from(incomingVariables.values()).map(
        (variable) => variable.randomize
      );
      console.log("Randomize :" + validatorList);
      setOtherValidator({
        Random: validatorList.includes(true),
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
        incomingTargetVar.interval = 1;
        incomingTargetVar.randomize = false;
        incomingTargetVar.value = 0;
        incomingTargetVar.minValue = 0;
        incomingTargetVar.maxValue = 10;
        // tempTypeValidator.Integer = true;
        break;
      case "String":
        incomingTargetVar.iterate = false;
        incomingTargetVar.interval = null;
        incomingTargetVar.randomize = null;
        incomingTargetVar.value = "String Here";
        incomingTargetVar.minValue = null;
        incomingTargetVar.maxValue = null;
        // tempTypeValidator.String = true;
        break;
      case "Date":
        console.log("Date");
        // tempTypeValidator.Date = true;
        break;
      case "List":
        console.log("List");
        incomingTargetVar.iterate = true;
        incomingTargetVar.interval = 1;
        incomingTargetVar.randomize = false;
        incomingTargetVar.value = "String Here";
        incomingTargetVar.minValue = null;
        incomingTargetVar.maxValue = null;
        incomingTargetVar.list = [];
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
                    <>{otherValidator.Random ? <th>End Value</th> : null}</>
                    <>
                      {typeValidator.Integer || typeValidator.List ? (
                        <th>Iterate</th>
                      ) : null}
                    </>
                    <>
                      {typeValidator.Integer || typeValidator.List ? (
                        <th>Inteval</th>
                      ) : null}
                    </>
                    <>
                      {typeValidator.Integer || typeValidator.List ? (
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
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleincomingHandleVariableChanges(
                                        key,
                                        "type",
                                        "List"
                                      )
                                    }
                                  >
                                    List
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>{" "}
                            </td>
                            <>
                              {values.randomize ? (
                                <>
                                  <td
                                    contentEditable="true"
                                    onBlur={(e) =>
                                      handleincomingHandleVariableChanges(
                                        key,
                                        "minValue",
                                        e.target.innerText
                                      )
                                    }
                                    className={css["td-var-value"]}
                                  >
                                    {values.minValue}
                                  </td>
                                  <td
                                    contentEditable="true"
                                    onBlur={(e) =>
                                      handleincomingHandleVariableChanges(
                                        key,
                                        "maxValue",
                                        e.target.innerText
                                      )
                                    }
                                    className={css["td-var-value"]}
                                  >
                                    {values.maxValue}
                                  </td>
                                </>
                              ) : (
                                <>
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
                                  {otherValidator.Random && <td></td>}
                                </>
                              )}
                            </>

                            <>
                              {values.type === "Integer" ||
                              values.type === "List" ? (
                                <td
                                  // contentEditable="true"
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
                              ) : (
                                <td></td>
                              )}
                            </>
                            <>
                              {values.type === "Integer" ||
                              values.type === "List" ? (
                                <td
                                  contentEditable="true"
                                  onBlur={(e) =>
                                    handleincomingHandleVariableChanges(
                                      key,
                                      "interval",
                                      parseInt(e.target.innerText)
                                    )
                                  }
                                >
                                  {values.interval}
                                </td>
                              ) : (
                                <td></td>
                              )}
                            </>
                            <>
                              {values.type === "Integer" ||
                              values.type === "List" ? (
                                <td>
                                  <div>
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={values.randomize}
                                        onClick={() =>
                                          handleincomingHandleVariableChanges(
                                            key,
                                            "randomize",
                                            !values.randomize
                                          )
                                        }
                                      />
                                    </label>
                                  </div>
                                </td>
                              ) : (
                                <td></td>
                              )}
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
