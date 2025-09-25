import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import VarTableHeader from "./var-table-header";
import VarTableBody from "./var-table-body";
import VariableModal from "./var-modal";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";

function VariableTable({
  incomingVariables,
  incomingHandlevariableChanges,
  incomingHandleHighestListVar,
  incomingHighestListVar,
}) {
  //tailwind css
  let tw_varTable_glassMorphBG =
    " shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-[6px] backdrop-saturate-[120%]  rounded-[18px] ";

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
    console.log("setMaxGeneratedSentencefromList()----- Start");
    if (selectedVar.id == incomingHighestListVar.id) {
      incomingHandleHighestListVar(selectedVar);
      console.log(`Same Variable`);
    } else {
      let selectedVarListTotalLength =
        selectedVar.list.length * selectedVar.interval;
      let highestVarListTotalLength =
        incomingHighestListVar.name != null
          ? incomingHighestListVar.list.length * incomingHighestListVar.interval
          : 0;
      if (selectedVarListTotalLength > highestVarListTotalLength) {
        incomingHandleHighestListVar(selectedVar);
        console.log(`Set ${selectedVar} as the new Highest List Variable`);
      }
    }
    console.log("setMaxGeneratedSentencefromList()----- DONE");
  }

  function handleVariableChanges(key, field, value) {
    const tempVarMap = new Map(incomingVariables);
    const targetVar = tempVarMap.get(key);
    if (targetVar) {
      targetVar[field] = value;

      // Change a Spaace into a New List
      if (targetVar["type"] === "List" && field === "value") {
        if (value.includes(" ") || value.includes("/n")) {
          targetVar.list.push(handleChipListChanges(value));
          targetVar["value"] = "";
          console.log("List in Target Var:" + targetVar["list"]);
          console.log("Target Var [Value]:" + targetVar["value"]);
        }
      }

      tempVarMap.set(key, targetVar);

      //Change Variable Type
      if (field === "type") {
        processLocalVariableTypeChanges(key, value, targetVar, tempVarMap);
      }

      // Switch Toggle a Randomize and Iterate Button
      if (field === "iterate" || field === "randomize") {
        let selectedField = field;
        let inverseField =
          selectedField === "iterate" ? "randomize" : "iterate";
        if (incomingHighestListVar === targetVar) {
          incomingHandleHighestListVar({ list: [] });
          console.log("masuk pak eko");
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
      validatorList = Array.from(incomingVariables.values()).map((variable) => {
        if (variable.type === "List" && variableField === "randomize") {
          return false;
        } else return variable[variableField];
      });
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
    // const tempVarMap = new Map(incomingVarMap);
    switch (typeValue) {
      case "Integer":
        incomingTargetVar.iterate = true;
        incomingTargetVar.interval = 1;
        incomingTargetVar.randomize = false;
        incomingTargetVar.value = 1;
        incomingTargetVar.minValue = 1;
        incomingTargetVar.maxValue = 10;
        // tempTypeValidator.Integer = true;
        break;
      case "String":
        incomingTargetVar.iterate = false;
        incomingTargetVar.interval = null;
        incomingTargetVar.randomize = null;
        incomingTargetVar.value = "";
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

  const [modalOn, setModalOn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  // const [currentVariable, setCurrentVariable] = useState(null);

  function handleModalOnChanges(passedVariable) {
    setModalOn(passedVariable);
  }

  function handleCurrentVariableSet(passedVariable, passedIndex) {
    console.log(
      "Setting current variable with index:",
      passedIndex,
      "variable:",
      passedVariable
    );
    setCurrentIndex(passedIndex); // Store the index
  }

  // Get the current variable dynamically using the index
  const currentVariable =
    currentIndex !== null ? incomingVariables.get(currentIndex) : null;
  return (
    <>
      <VariableModal
        modalState={modalOn}
        setModalState={setModalOn}
        incomingIndex={currentIndex}
        incomingValues={currentVariable}
        incomingHandleVariableChanges={handleVariableChanges}
      ></VariableModal>
      <AnimatePresence>
        {incomingVariables !== undefined && incomingVariables.size > 0 ? (
          <LayoutGroup>
            <motion.div
              className={"w-auto sm:w-[10%] h-auto rounded-[10px] flex justify-center"}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
                className={
                  "rounded-[10px] w-[80vw] sm:w-full h-auto   " +
                  tw_varTable_glassMorphBG
                }
                style={{ minHeight: "fit-content" }}
                transition={{ duration: 0.2 }}
              >
                <motion.table className="w-full table-fixed">
                  <VarTableHeader
                    incomingTypeValidator={typeValidator}
                    incomingOtherTypeValidator={otherValidator}
                  />
                  <VarTableBody
                    incomingVariablesBody={incomingVariables}
                    incomingHandleVariableChanges={handleVariableChanges}
                    incomingTypeValidator={typeValidator}
                    incomingOtherValidator={otherValidator}
                    incomingHandleModalOnChange={handleModalOnChanges}
                    incomingHandleCurrentVariableSet={handleCurrentVariableSet}
                  />
                </motion.table>
              </motion.div>
            </motion.div>
          </LayoutGroup>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default VariableTable;
