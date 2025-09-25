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
    " shadow-[0_0_30px_rgba(0,0,0,0.35)] backdrop-blur-[6px] backdrop-saturate-[120%]  bg-white bg-opacity-10";
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
              className="w-screen h-screen inset-0 fixed z-[100] [&>*]:text-white"
            >
              <motion.div
                className="w-screen h-screen inset-0 fixed bg-[rgba(49,49,49,0.8)] "
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
                      className={`w-[80%] sm:w-[30%] text-center absolute h-auto grid gap-[10px] -translate-x-2/4 -translate-y-2/4 leading-[1.4] max-w-[70%] min-w-[300px] px-7 py-3.5 rounded-[3px] left-2/4 top-2/4 ${tw_varModal_glassMorphBG} `}
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
                            incomingCustomColorText={"white"}
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
                              <Dropdown className="flex h-full flex-col gap-1 justify-center items-center">
                                <Dropdown.Toggle
                                  variant="secondary"
                                  id="dropdown-basic"
                                  style={{
                                    minWidth: "auto",
                                    width: "100%",
                                  }}
                                  className="!w-full !h-full !text-sm !bg-transparent !border-none"
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
                                  className="w-full h-full flex flex-col gap-1 justify-center items-center "
                                >
                                  <motion.div className="text-sm">
                                    Randomize
                                  </motion.div>

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
                                  className="w-full h-full w-full h-full flex flex-col gap-1 justify-center items-center "
                                  initial={{ y: -10 }}
                                  animate={{ y: 0 }}
                                >
                                  <motion.div className="text-sm">
                                    Iterate
                                  </motion.div>
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
                            <motion.div className="w-full h-full grid gap-[5px]">
                              <motion.div>Chip List</motion.div>
                              <AnimatePresence mode="popLayout">
                                <motion.div className="w-full grid grid-cols-3 sm:grid-cols-4 gap-[10px]">
                                  <Chip
                                    incomingVariableIndex={incomingIndex}
                                    incomingChipList={incomingValues.list}
                                    incomingHandleVariableChanges={
                                      incomingHandleVariableChanges
                                    }
                                  ></Chip>
                                </motion.div>
                              </AnimatePresence>
                            </motion.div>
                          ) : null}
                          <motion.div
                            className={`gap-[10px]   w-full [&>*]:w-full grid place-items-center ${
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
                                    className="w-full h-full grid gap-[5px] "
                                  >
                                    <motion.div>Start Value</motion.div>

                                    <VarTableRowData
                                      incomingKey={incomingIndex}
                                      incomingValues={incomingValues}
                                      tableDataType={"VarStartValue"}
                                      incomingchangedValues={"value"}
                                      incomingHandleVariableChanges={
                                        incomingHandleVariableChanges
                                      }
                                      incomingCustomColorText={"white"}
                                      incomingCustomBGColorText={"white"}
                                    ></VarTableRowData>
                                  </motion.div>
                                ) : (
                                  <>
                                    {incomingValues.type == "List" ? (
                                      <motion.div
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        className="w-full h-full grid gap-[5px]  "
                                      >
                                        <motion.div>Start Value</motion.div>
                                        <VarTableRowData
                                          incomingKey={incomingIndex}
                                          incomingValues={incomingValues}
                                          tableDataType={"VarStartValue"}
                                          incomingchangedValues={"value"}
                                          incomingHandleVariableChanges={
                                            incomingHandleVariableChanges
                                          }
                                          incomingCustomColorText={"white"}
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
                                      className="w-full h-full grid gap-[5px]  "
                                    >
                                      <motion.div>Min Value</motion.div>
                                      <VarTableRowData
                                        incomingKey={incomingIndex}
                                        incomingValues={incomingValues}
                                        tableDataType={"VarStartValue"}
                                        incomingchangedValues={"minValue"}
                                        incomingHandleVariableChanges={
                                          incomingHandleVariableChanges
                                        }
                                        incomingCustomColorText={"white"}
                                        incomingCustomBGColorText={"white"}
                                      ></VarTableRowData>
                                    </motion.div>

                                    <motion.div
                                      initial={{ x: -10 }}
                                      animate={{ x: 0 }}
                                      className="w-full h-full grid gap-[5px]  "
                                    >
                                      <motion.div>Max Value</motion.div>
                                      <VarTableRowData
                                        incomingKey={incomingIndex}
                                        incomingValues={incomingValues}
                                        tableDataType={"VarStartValue"}
                                        incomingchangedValues={"maxValue"}
                                        incomingHandleVariableChanges={
                                          incomingHandleVariableChanges
                                        }
                                        incomingCustomColorText={"white"}
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
                                    className="w-full h-full grid gap-[5px]  "
                                  >
                                    <motion.div>Start Date</motion.div>
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
                                      className="w-full h-full grid gap-[5px]  "
                                    >
                                      <motion.div>Min Date </motion.div>
                                      <VarTableRowData
                                        incomingKey={incomingIndex}
                                        incomingValues={incomingValues}
                                        tableDataType={"VarStartValue"}
                                        incomingchangedValues={"minDateValue"}
                                        incomingHandleVariableChanges={
                                          incomingHandleVariableChanges
                                        }
                                        incomingCustomColorText={"white"}
                                        incomingCustomBGColorText={"white"}
                                      ></VarTableRowData>
                                    </motion.div>
                                    <motion.div
                                      initial={{ x: -10 }}
                                      animate={{ x: 0 }}
                                      className="w-full h-full grid gap-[5px]  "
                                    >
                                      <motion.div>Max Date </motion.div>
                                      <VarTableRowData
                                        incomingKey={incomingIndex}
                                        incomingValues={incomingValues}
                                        tableDataType={"VarStartValue"}
                                        incomingchangedValues={"maxDateValue"}
                                        incomingHandleVariableChanges={
                                          incomingHandleVariableChanges
                                        }
                                        incomingCustomColorText={"white"}
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
                              className="w-full h-full grid gap-[5px]  "
                              initial={{ x: -10 }}
                              animate={{ x: 0 }}
                            >
                              <motion.div>Interval </motion.div>
                              <VarTableRowData
                                incomingKey={incomingIndex}
                                incomingValues={incomingValues}
                                tableDataType={"VarInterval"}
                                incomingchangedValues={"interval"}
                                incomingHandleVariableChanges={
                                  incomingHandleVariableChanges
                                }
                                incomingCustomColorText={"white"}
                                incomingCustomBGColorText={"white"}
                              ></VarTableRowData>
                            </motion.div>
                          ) : null}
                        </motion.div>
                      </motion.div>
                      <motion.div className="w-full h-full">
                        <motion.button
                          onClick={(e) => changeModalCondition()}
                          whileTap={{ scale: 0.9 }}
                          className="text-white border-1 border-main-color p-[10px]  hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] rounded-[10px]"
                        >
                          ✕ Close Variable
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
