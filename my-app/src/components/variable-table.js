import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import css from "./variable.module.css";
import Chip from "./chip-list";

function VariableTable({
  incomingVariables,
  incomingHandlevariableChanges,
  incomingHandleHighestListVar,
  incomingHighestListVar,
}) {
  // const initializedName = useRef(new Set());


  const editableRef = useRef(null);

  const [typeValidator, setTypeValidator] = useState({
    Integer: false,
    String: false,
    Date: false,
    List: false,
  });

  const [otherValidator, setOtherValidator] = useState({
    Random: false,
  });

  const handleChipListChanges = (textValue) => {
    return textValue.split(",");
  };

  function setMaxGeneratedSentencefromList(selectedVar) {
    // console.log(
    //   "Incoming Highest List Var:" +
    //     incomingHighestListVar +
    //     " with this len: " +
    //     incomingHighestListVar.list.length
    // );
    // console.log(incomingHighestListVar);
    // console.log(
    //   "Selected List Var:" +
    //     selectedVar +
    //     " with this len: " +
    //     selectedVar.list.length
    // );
    // console.log(selectedVar);

    if (incomingHandleHighestListVar != null) {
      if (selectedVar.list.length > incomingHighestListVar.list.length) {
        incomingHandleHighestListVar(selectedVar);
        console.log("Masuk Testing");
      }
    }
  }

  function handleVariableChanges(key, field, value) {
    const tempVarMap = new Map(incomingVariables);
    const targetVar = tempVarMap.get(key);
    if (targetVar) {
      targetVar[field] = value;

      if (targetVar["type"] === "List" && field === "value") {
        if (value.includes(" ") || value.includes("/n")) {
          targetVar.list.push(handleChipListChanges(value));
          targetVar["value"] = "";
          console.log("List in Target Var:" + targetVar["list"]);
          console.log("Target Var [Value]:" + targetVar["value"]);
        }
      }

      tempVarMap.set(key, targetVar);
      if (field === "type") {
        processLocalVariableTypeChanges(key, value, targetVar, tempVarMap);
      }
      if (field === "iterate" || field === "randomize") {
        let selectedField = field;
        let inverseField =
          selectedField === "iterate" ? "randomize" : "iterate";
        if (incomingHighestListVar === targetVar) {
          incomingHandleHighestListVar({ list: [] });
        }
        if (targetVar[inverseField] === true) {
          targetVar[inverseField] = false;

          tempVarMap.set(key, targetVar);
        }
      }
      if (targetVar["type"] === "List" && targetVar["iterate"] === true) {
        setMaxGeneratedSentencefromList(targetVar);
        console.log("Target Var Type: " + targetVar["type"]);
        console.log("Target Var iterate: " + targetVar["iterate"]);
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
        incomingTargetVar.iterate = true;
        incomingTargetVar.interval = 1;
        incomingTargetVar.randomize = false;
        incomingTargetVar.value = null;
        incomingTargetVar.minValue = null;
        incomingTargetVar.maxValue = null;
        incomingTargetVar.dateValue = new Date();
        incomingTargetVar.minDateValue = new Date();
        incomingTargetVar.maxDateValue = new Date();
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
                    <>
                      {otherValidator.Random &&
                      (typeValidator.Integer || typeValidator.Date) ? (
                        <th>End Value</th>
                      ) : null}
                    </>
                    <>
                      {typeValidator.Integer ||
                      typeValidator.List ||
                      typeValidator.Date ? (
                        <th>Iterate</th>
                      ) : null}
                    </>
                    <>
                      {typeValidator.Integer ||
                      typeValidator.List ||
                      typeValidator.Date ? (
                        <th>Inteval</th>
                      ) : null}
                    </>
                    <>
                      {typeValidator.Integer ||
                      typeValidator.List ||
                      typeValidator.Date ? (
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
                                handleVariableChanges(
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
                                      handleVariableChanges(
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
                                      handleVariableChanges(
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
                                      handleVariableChanges(key, "type", "Date")
                                    }
                                  >
                                    Date
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleVariableChanges(key, "type", "List")
                                    }
                                  >
                                    List
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>{" "}
                            </td>
                            <>
                              {values.randomize &&
                              (values.type === "Integer" ||
                                values.type === "Date") ? (
                                <>
                                  <td
                                    contentEditable="true"
                                    onBlur={(e) =>
                                      handleVariableChanges(
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
                                      handleVariableChanges(
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
                                  <td>
                                    {values.list != null &&
                                    values.type === "List" ? (
                                      <Chip
                                        incomingVariableIndex={key}
                                        incomingChipList={values.list}
                                        incomingHandleVariableChanges={
                                          handleVariableChanges
                                        }
                                      ></Chip>
                                    ) : (
                                      ""
                                    )}

                                    {values.type !== "Date" ? (
                                      <input
                                        ref={editableRef}
                                        type="text"
                                        value={values.value}
                                        onChange={(e) =>
                                          handleVariableChanges(
                                            key,
                                            "value",
                                            e.target.value
                                          )
                                        }
                                        className={css["td-var-value"]}
                                      ></input>
                                    ) : (
                                      <input
                                        type="date"
                                        value={
                                          values.dateValue
                                            ? values.dateValue
                                                .toISOString()
                                                .split("T")[0]
                                            : ""
                                        }
                                        onChange={(e) => {
                                          const selectedDate = e.target.value
                                            ? new Date(e.target.value)
                                            : null;
                                          handleVariableChanges(
                                            key,
                                            "dateValue",
                                            selectedDate
                                          );
                                        }}
                                        className={css["td-var-value"]}
                                      />
                                    )}
                                  </td>
                                  {/* {otherValidator.Random && <td></td>} //apa ini? */}
                                </>
                              )}
                            </>

                            <>
                              {values.type === "Integer" ||
                              values.type === "List" ||
                              values.type === "Date" ? (
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
                                          handleVariableChanges(
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
                              values.type === "List" ||
                              values.type === "Date" ? (
                                <td
                                  contentEditable="true"
                                  onBlur={(e) =>
                                    handleVariableChanges(
                                      key,
                                      "interval",
                                      parseInt(e.target.innerText)
                                    )
                                  }
                                >
                                  {values.interval}
                                </td>
                              ) : (
                                <td></td> //apa ini??
                              )}
                            </>
                            <>
                              {values.type === "Integer" ||
                              values.type === "List" ||
                              values.type === "Date" ? (
                                <td>
                                  <div>
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={values.randomize}
                                        onClick={() =>
                                          handleVariableChanges(
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
