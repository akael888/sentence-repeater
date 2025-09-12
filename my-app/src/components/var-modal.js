import { useState } from "react";
import VarTableRowData from "./var-table-row-data";
import Dropdown from "react-bootstrap/Dropdown";
import Chip from "./chip-list";

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

  if (!incomingValues) {
    return null;
  }

  return (
    <>
      {modalState ? (
        <>
          <div className="w-screen h-screen inset-0 fixed z-[100]">
            <div className="w-screen h-screen inset-0 fixed bg-[rgba(49,49,49,0.8)]">
              <div className=" absolute -translate-x-2/4 -translate-y-2/4 leading-[1.4] max-w-[600px] min-w-[300px] px-7 py-3.5 rounded-[3px] left-2/4 top-2/4 bg-main-color">
                <h1>
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
                </h1>
                <div className="w-full h-full">
                  <div className="w-full h-full grid place-items-center grid-rows-5 gap-[10px]">
                    <div
                      className={`w-full [&>*]:w-full h-full grid place-items-center grid-cols-${
                        incomingValues.type !== "String" ? 3 : 1
                      }`}
                    >
                      <div>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                          >
                            {incomingValues.type}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
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
                      </div>

                      {incomingValues.type != "String" ? (
                        <>
                          <div>
                            Randomize
                            <VarTableRowData
                              incomingKey={incomingIndex}
                              incomingValues={incomingValues}
                              tableDataType={"VarBoolean"}
                              incomingchangedValues={"randomize"}
                              incomingHandleVariableChanges={
                                incomingHandleVariableChanges
                              }
                            ></VarTableRowData>
                          </div>
                          <div>
                            Iterate
                            <VarTableRowData
                              incomingKey={incomingIndex}
                              incomingValues={incomingValues}
                              tableDataType={"VarBoolean"}
                              incomingchangedValues={"iterate"}
                              incomingHandleVariableChanges={
                                incomingHandleVariableChanges
                              }
                            ></VarTableRowData>
                          </div>
                        </>
                      ) : null}
                    </div>

                    {incomingValues.type == "List" ? (
                      <div className="w-full h-full">
                        Chip List
                        <div>
                          <Chip
                            incomingVariableIndex={incomingIndex}
                            incomingChipList={incomingValues.list}
                            incomingHandleVariableChanges={
                              incomingHandleVariableChanges
                            }
                          ></Chip>
                        </div>
                      </div>
                    ) : null}
                    <div
                      className={`gap-[10px] w-full [&>*]:w-full h-full grid place-items-center grid-cols-${
                        !incomingValues.randomize ? 1 : 2
                      }`}
                    >
                      {incomingValues.type == "Integer" ||
                      incomingValues.type == "String" ||
                      incomingValues.type == "List" ? (
                        <>
                          {!incomingValues.randomize ? (
                            <div className="w-full h-full">
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
                            </div>
                          ) : (
                            <>
                              {incomingValues.type == "List" ? (
                                <div className="w-full h-full">
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
                                </div>
                              ) : null}
                            </>
                          )}
                          {incomingValues.randomize &&
                          !incomingValues.type !== "String" &&
                          incomingValues.type !== "List" ? (
                            <>
                              <div>
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
                              </div>

                              <div>
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
                              </div>
                            </>
                          ) : null}
                        </>
                      ) : null}

                      {incomingValues.type == "Date" ? (
                        <>
                          {!incomingValues.randomize ? (
                            <div>
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
                            </div>
                          ) : null}
                          {incomingValues.randomize ? (
                            <>
                              <div>
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
                              </div>
                              <div>
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
                              </div>
                            </>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                    {incomingValues.iterate ? (
                      <div className="w-full">
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
                      </div>
                    ) : null}
                  </div>
                </div>
                <button
                  onClick={(e) => changeModalCondition()}
                  className="bg-opposite-color text-main-color border-2 border-main-color p-[10px] hover:bg-main-color hover:border-opposite-color hover:text-opposite-color rounded-[10px]"
                >
                  Close Variable
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default VariableModal;
