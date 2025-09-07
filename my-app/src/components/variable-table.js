import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";

import css from "./variable.module.css";

import VarTableHeader from "./var-table-header";
import VarTableBody from "./var-table-body";

function VariableTable({
  incomingVariables,
  incomingHandlevariableChanges,
  incomingHandleHighestListVar,
  incomingHighestListVar,
}) {
  // const initializedName = useRef(new Set());

  const [typeValidator, setTypeValidator] = useState({
    Integer: false,
    String: false,
    Date: false,
    List: false,
  });

  const [otherValidator, setOtherValidator] = useState({
    Random: false,
    Iterate: false,
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
      setTypeValidator({
        Integer: getValidatorValue("type").includes("Integer"),
        String: getValidatorValue("type").includes("String"),
        Date: getValidatorValue("type").includes("Date"),
        List: getValidatorValue("type").includes("List"),
      });
      setOtherValidator({
        Random: getValidatorValue("randomize").includes(true),
        Iterate: getValidatorValue("iterate").includes(true),
      });
    }

    function getValidatorValue(variableField) {
      let validatorList = null;
      validatorList = Array.from(incomingVariables.values()).map(
        (variable) => variable[variableField]
      );
      return validatorList;
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
        incomingTargetVar.value = "This is a Test String";
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
        incomingTargetVar.value = "";
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
      {incomingVariables !== undefined && incomingVariables.size > 0 ? (
        <div className={css["variable-container"]}>
          <table className={css["variable-table-name"]}>
            <VarTableHeader
              incomingTypeValidator={typeValidator}
              incomingOtherTypeValidator={otherValidator}
            ></VarTableHeader>
            <VarTableBody
              incomingVariablesBody={incomingVariables}
              incomingHandleVariableChanges={handleVariableChanges}
              incomingTypeValidator={typeValidator}
              incomingOtherValidator={otherValidator}
            ></VarTableBody>
          </table>
        </div>
      ) : null}
    </>
  );
}

export default VariableTable;
