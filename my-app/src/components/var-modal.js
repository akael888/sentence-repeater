import { useState } from "react";
import VarTableRowData from "./var-table-row-data";
import Dropdown from "react-bootstrap/Dropdown";
import Chip from "./chip-list";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

function VariableModal({
  modalState,
  setModalState,
  incomingIndex,
  incomingValues,
  incomingHandleVariableChanges,
}) {
  function changeModalCondition() {
    console.log(`MODAL key :${incomingIndex}, values: ${incomingValues}`);
    console.log("Modal:", incomingIndex, incomingValues);
    setModalState(!modalState);
  }
  let tw_varModal_glassMorphBG =
    " bg-[color-mix(in_srgb,var(--main-color)_90%,transparent)] backdrop-blur-[10px]";
  // function printIntervalProperTerm() {
  //   switch (incomingValues.type) {
  //     case "Integer":
  //       return "Number";
  //     case "Date":
  //       return "Day(s)";
  //     default:
  //       return "";
  //   }
  // }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      setModalState(false);
    }
  }

  if (!incomingValues) {
    return null;
  }

  return (
    <>
      <AnimatePresence initial={false}>
        {modalState ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              className="w-screen h-screen inset-0 fixed z-[100]"
            >
              <motion.div
                className="w-screen h-screen inset-0 fixed bg-[rgba(49,49,49,0.8)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                onClick={handleBackdropClick}
              >
                <LayoutGroup>
                  <AnimatePresence mode="popLayout">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className={`w-[80%] text-center absolute h-auto grid gap-[10px] -translate-x-2/4 -translate-y-2/4 leading-[1.4] max-w-[70%] min-w-[300px] px-7 py-3.5 rounded-[3px] left-2/4 top-2/4 ${tw_varModal_glassMorphBG} border border-white`}
                  >
                    <motion.div className="w-full h-full">
                      <motion.h1>
                        <VarTableRowData
                          incomingKey={incomingIndex}
                          incomingValues={incomingValues}
                          tableDataType={"VarName"}
                          incomingchangedValues={"name"}
                          incomingHandleVariableChanges={
                            incomingHandleVariableChanges
                          }
                          incomingCustomColorText={"opposite-color"}
                        ></VarTableRowData>
                      </motion.h1>

                      <motion.div
                        className={`w-full [$>*]:w-full grid place-items-center ${
                          incomingValues.type !== "String"
                            ? "grid-rows-3"
                            : "grid-rows-2"
                        },0.5fr)] gap-[10px] auto-rows-auto`}
                      >
                        <motion.div
                          className={`w-full gap-[2%] h-auto [&>*]:w-full [&>*]:text-sm [&>*]:w-full grid place-items-center ${
                            incomingValues.type !== "String"
                              ? "grid-cols-3"
                              : "grid-cols-1"
                          } `}
                        >
                          <motion.div className="w-full h-full">
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="secondary"
                                id="dropdown-basic"
                                style={{
                                  minWidth: "auto",
                                  width: "100%",
                                }}
                                className="!w-full"
                              >
                                {incomingValues.type}
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="!z-index-1">
                                <Dropdown.Item
                                  onClick={() =>
                                    incomingHandleVariableChanges(
                                      incomingIndex,
                                      "type",
                                      "Integer"
                                    )
                                  }
                                >
                                  Integer
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    incomingHandleVariableChanges(
                                      incomingIndex,
                                      "type",
                                      "String"
                                    )
                                  }
                                >
                                  String
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    incomingHandleVariableChanges(
                                      incomingIndex,
                                      "type",
                                      "Date"
                                    )
                                  }
                                >
                                  Date
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    incomingHandleVariableChanges(
                                      incomingIndex,
                                      "type",
                                      "List"
                                    )
                                  }
                                >
                                  List
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </motion.div>

                          {incomingValues.type != "String" ? (
                            <>
                              <motion.div
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                className="w-full h-full"
                              >
                                <motion.div>Randomize</motion.div>

                                <VarTableRowData
                                  incomingKey={incomingIndex}
                                  incomingValues={incomingValues}
                                  tableDataType={"VarBoolean"}
                                  incomingchangedValues={"randomize"}
                                  incomingHandleVariableChanges={
                                    incomingHandleVariableChanges
                                  }
                                ></VarTableRowData>
                              </motion.div>
                              <motion.div
                                className="w-full h-full "
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                              >
                                <motion.div>Iterate</motion.div>
                                <VarTableRowData
                                  incomingKey={incomingIndex}
                                  incomingValues={incomingValues}
                                  tableDataType={"VarBoolean"}
                                  incomingchangedValues={"iterate"}
                                  incomingHandleVariableChanges={
                                    incomingHandleVariableChanges
                                  }
                                ></VarTableRowData>
                              </motion.div>
                            </>
                          ) : null}
                        </motion.div>

                        {incomingValues.type == "List" ? (
                          <motion.div className="w-full border  ">
                            Chip List
                            <motion.div className="w-full grid grid-cols-3 gap-[10px]">
                              <Chip
                                incomingVariableIndex={incomingIndex}
                                incomingChipList={incomingValues.list}
                                incomingHandleVariableChanges={
                                  incomingHandleVariableChanges
                                }
                              ></Chip>
                            </motion.div>
                          </motion.div>
                        ) : null}
                        <motion.div
                          className={`gap-[10px] border  w-full [&>*]:w-full grid place-items-center ${
                            incomingValues.type !== "String" &&
                            incomingValues.type !== "List" &&
                            incomingValues.randomize
                              ? "grid-cols-2"
                              : "grid-cols-1"
                          }`}
                        >
                          {incomingValues.type == "Integer" ||
                          incomingValues.type == "String" ||
                          incomingValues.type == "List" ? (
                            <>
                              {!incomingValues.randomize ? (
                                <motion.div
                                  initial={{ x: -10 }}
                                  animate={{ x: 0 }}
                                  className="w-full "
                                >
                                  Start Value
                                  <VarTableRowData
                                    incomingKey={incomingIndex}
                                    incomingValues={incomingValues}
                                    tableDataType={"VarStartValue"}
                                    incomingchangedValues={"value"}
                                    incomingHandleVariableChanges={
                                      incomingHandleVariableChanges
                                    }
                                    incomingCustomColorText={"opposite-color"}
                                    incomingCustomBGColorText={"white"}
                                  ></VarTableRowData>
                                </motion.div>
                              ) : (
                                <>
                                  {incomingValues.type == "List" ? (
                                    <motion.div
                                      initial={{ x: -10 }}
                                      animate={{ x: 0 }}
                                      className="w-full "
                                    >
                                      Start Value
                                      <VarTableRowData
                                        incomingKey={incomingIndex}
                                        incomingValues={incomingValues}
                                        tableDataType={"VarStartValue"}
                                        incomingchangedValues={"value"}
                                        incomingHandleVariableChanges={
                                          incomingHandleVariableChanges
                                        }
                                        incomingCustomColorText={
                                          "opposite-color"
                                        }
                                        incomingCustomBGColorText={"white"}
                                      ></VarTableRowData>
                                    </motion.div>
                                  ) : null}
                                </>
                              )}
                              {incomingValues.randomize &&
                              !incomingValues.type !== "String" &&
                              incomingValues.type !== "List" ? (
                                <>
                                  <motion.div
                                    initial={{ x: -10 }}
                                    animate={{ x: 0 }}
                                  >
                                    Min Value
                                    <VarTableRowData
                                      incomingKey={incomingIndex}
                                      incomingValues={incomingValues}
                                      tableDataType={"VarStartValue"}
                                      incomingchangedValues={"minValue"}
                                      incomingHandleVariableChanges={
                                        incomingHandleVariableChanges
                                      }
                                      incomingCustomColorText={"opposite-color"}
                                      incomingCustomBGColorText={"white"}
                                    ></VarTableRowData>
                                  </motion.div>

                                  <motion.div
                                    initial={{ x: -10 }}
                                    animate={{ x: 0 }}
                                  >
                                    Max Value
                                    <VarTableRowData
                                      incomingKey={incomingIndex}
                                      incomingValues={incomingValues}
                                      tableDataType={"VarStartValue"}
                                      incomingchangedValues={"maxValue"}
                                      incomingHandleVariableChanges={
                                        incomingHandleVariableChanges
                                      }
                                      incomingCustomColorText={"opposite-color"}
                                      incomingCustomBGColorText={"white"}
                                    ></VarTableRowData>
                                  </motion.div>
                                </>
                              ) : null}
                            </>
                          ) : null}

                          {incomingValues.type == "Date" ? (
                            <>
                              {!incomingValues.randomize ? (
                                <motion.div
                                  initial={{ x: -10 }}
                                  animate={{ x: 0 }}
                                >
                                  Start Date Value
                                  <VarTableRowData
                                    incomingKey={incomingIndex}
                                    incomingValues={incomingValues}
                                    tableDataType={"VarStartValue"}
                                    incomingchangedValues={"dateValue"}
                                    incomingHandleVariableChanges={
                                      incomingHandleVariableChanges
                                    }
                                    incomingCustomColorText={"opposite-color"}
                                    incomingCustomBGColorText={"white"}
                                  ></VarTableRowData>
                                </motion.div>
                              ) : null}
                              {incomingValues.randomize ? (
                                <>
                                  <motion.div
                                    initial={{ x: -10 }}
                                    animate={{ x: 0 }}
                                  >
                                    Min Date Value
                                    <VarTableRowData
                                      incomingKey={incomingIndex}
                                      incomingValues={incomingValues}
                                      tableDataType={"VarStartValue"}
                                      incomingchangedValues={"minDateValue"}
                                      incomingHandleVariableChanges={
                                        incomingHandleVariableChanges
                                      }
                                      incomingCustomColorText={"opposite-color"}
                                      incomingCustomBGColorText={"white"}
                                    ></VarTableRowData>
                                  </motion.div>
                                  <motion.div
                                    initial={{ x: -10 }}
                                    animate={{ x: 0 }}
                                  >
                                    Max Date Value
                                    <VarTableRowData
                                      incomingKey={incomingIndex}
                                      incomingValues={incomingValues}
                                      tableDataType={"VarStartValue"}
                                      incomingchangedValues={"maxDateValue"}
                                      incomingHandleVariableChanges={
                                        incomingHandleVariableChanges
                                      }
                                      incomingCustomColorText={"opposite-color"}
                                      incomingCustomBGColorText={"white"}
                                    ></VarTableRowData>
                                  </motion.div>
                                </>
                              ) : null}
                            </>
                          ) : null}
                        </motion.div>
                        {incomingValues.iterate ? (
                          <motion.div
                            className="w-full border "
                            initial={{ x: -10 }}
                            animate={{ x: 0 }}
                          >
                            Interval
                            <VarTableRowData
                              incomingKey={incomingIndex}
                              incomingValues={incomingValues}
                              tableDataType={"VarInterval"}
                              incomingchangedValues={"interval"}
                              incomingHandleVariableChanges={
                                incomingHandleVariableChanges
                              }
                              incomingCustomColorText={"opposite-color"}
                              incomingCustomBGColorText={"white"}
                            ></VarTableRowData>
                          </motion.div>
                        ) : null}
                      </motion.div>
                    </motion.div>
                    <motion.div className="w-full h-full" >
                      <motion.button
                        onClick={(e) => changeModalCondition()}
                        whileTap={{ scale: 0.9 }}
                        className="bg-opposite-color text-main-color border-2 border-main-color p-[10px] hover:bg-main-color hover:border-opposite-color hover:text-opposite-color rounded-[10px]"
                      >
                        Close Variable
                      </motion.button>
                    </motion.div>
                  </motion.div>
                  </AnimatePresence>
                </LayoutGroup>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default VariableModal;
