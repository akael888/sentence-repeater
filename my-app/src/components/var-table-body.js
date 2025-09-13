import Dropdown from "react-bootstrap/Dropdown";
import Chip from "./chip-list";
import css from "./var-table-body.module.css";
import { useState, useRef } from "react";
import VarTableRowData from "./var-table-row-data";
import SpawnVarModal from "./spawn-var-modal-button";
import VariableModal from "./var-modal";

function VarTableBody({
  incomingVariablesBody,
  incomingHandleVariableChanges,
  incomingTypeValidator,
  incomingOtherValidator,
  incomingHandleModalOnChange,
  incomingHandleCurrentVariableSet,
}) {
  //   const editableRef = useRef(null);
  return (
    <>
      <div></div>
      <tbody className="shrink-1">
        {Array.from(incomingVariablesBody.entries()).map(([key, values]) => (
          <tr key={key} className={"[&>*]:shrink-1 "}>
            <td>
              <VarTableRowData
                incomingKey={key}
                incomingValues={values}
                tableDataType={"VarName"}
                incomingchangedValues={"name"}
                incomingHandleVariableChanges={incomingHandleVariableChanges}
                incomingCustomColorText="main-color"
              ></VarTableRowData>
            </td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {values.type}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      incomingHandleVariableChanges(key, "type", "Integer")
                    }
                  >
                    Integer
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      incomingHandleVariableChanges(key, "type", "String")
                    }
                  >
                    String
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      incomingHandleVariableChanges(key, "type", "Date")
                    }
                  >
                    Date
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      incomingHandleVariableChanges(key, "type", "List")
                    }
                  >
                    List
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
            <td>
              <SpawnVarModal
                incomingSelectedVariable={values}
                incomingHandleModalOnChangeforSpawn={incomingHandleModalOnChange}
                incomingHandleSelectedKey={key}
                incomingHandleCurrentVariableSet={incomingHandleCurrentVariableSet}
              ></SpawnVarModal>
            </td>
            {/* <>
              {values.randomize &&
              (values.type === "Integer" || values.type === "Date") ? (
                <>
                  {values.type === "Integer" ? (
                    <>
                      <td>
                        <VarTableRowData
                          incomingKey={key}
                          incomingValues={values}
                          tableDataType={"VarStartValue"}
                          incomingchangedValues={"minValue"}
                          incomingHandleVariableChanges={
                            incomingHandleVariableChanges
                          }
                        ></VarTableRowData>
                      </td>

                      <td>
                        <VarTableRowData
                          incomingKey={key}
                          incomingValues={values}
                          tableDataType={"VarStartValue"}
                          incomingchangedValues={"maxValue"}
                          incomingHandleVariableChanges={
                            incomingHandleVariableChanges
                          }
                        ></VarTableRowData>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <VarTableRowData
                          incomingKey={key}
                          incomingValues={values}
                          tableDataType={"VarStartValue"}
                          incomingchangedValues={"minDateValue"}
                          incomingHandleVariableChanges={
                            incomingHandleVariableChanges
                          }
                        ></VarTableRowData>
                      </td>
                      <td>
                        <VarTableRowData
                          incomingKey={key}
                          incomingValues={values}
                          tableDataType={"VarStartValue"}
                          incomingchangedValues={"maxDateValue"}
                          incomingHandleVariableChanges={
                            incomingHandleVariableChanges
                          }
                        ></VarTableRowData>
                      </td>
                    </>
                  )}
                </>
              ) : (
                <>
                  <td>
                    {values.list != null && values.type === "List" ? (
                      <Chip
                        incomingVariableIndex={key}
                        incomingChipList={values.list}
                        incomingHandleVariableChanges={
                          incomingHandleVariableChanges
                        }
                      ></Chip>
                    ) : (
                      ""
                    )}

                    {values.type !== "Date" ? (
                      <>
                        <VarTableRowData
                          incomingKey={key}
                          incomingValues={values}
                          tableDataType={"VarStartValue"}
                          incomingchangedValues={"value"}
                          incomingHandleVariableChanges={
                            incomingHandleVariableChanges
                          }
                        ></VarTableRowData>
                      </>
                    ) : (
                      <>
                        <VarTableRowData
                          incomingKey={key}
                          incomingValues={values}
                          tableDataType={"VarStartValue"}
                          incomingchangedValues={"dateValue"}
                          incomingHandleVariableChanges={
                            incomingHandleVariableChanges
                          }
                        ></VarTableRowData>
                      </>
                    )}
                  </td>
                  {incomingOtherValidator.Random &&
                    (incomingTypeValidator.Integer ||
                      incomingTypeValidator.Date) && <td></td>}
                </> //Untuk Munculin td tambahan kalau ada variable yang randomize
              )}
            </>

            {/* <>
              {values.type === "Integer" ||
              values.type === "List" ||
              values.type === "Date" ? (
                <td>
                  <VarTableRowData
                    incomingKey={key}
                    incomingValues={values}
                    tableDataType={"VarBoolean"}
                    incomingchangedValues={"iterate"}
                    incomingHandleVariableChanges={
                      incomingHandleVariableChanges
                    }
                  ></VarTableRowData>
                </td>
              ) : (
                incomingOtherValidator.Random &&
                (incomingTypeValidator.Integer ||
                  incomingTypeValidator.Date) && <td></td>
              )}
            </>
            <>
              {(values.type === "Integer" ||
                values.type === "List" ||
                values.type === "Date") &&
              values.iterate ? (
                <>
                  <td>
                    <VarTableRowData
                      incomingKey={key}
                      incomingValues={values}
                      tableDataType={"VarInterval"}
                      incomingchangedValues={"interval"}
                      incomingHandleVariableChanges={
                        incomingHandleVariableChanges
                      }
                    ></VarTableRowData>
                  </td>
                </>
              ) : (
                incomingOtherValidator.Iterate &&
                (incomingTypeValidator.Integer ||
                  incomingTypeValidator.Date) && <td></td> //apa ini??
              )}
            </>
            <>
              {values.type === "Integer" ||
              values.type === "List" ||
              values.type === "Date" ? (
                <td>
                  <VarTableRowData
                    incomingKey={key}
                    incomingValues={values}
                    tableDataType={"VarBoolean"}
                    incomingchangedValues={"randomize"}
                    incomingHandleVariableChanges={
                      incomingHandleVariableChanges
                    }
                  ></VarTableRowData>
                </td>
              ) : (
                incomingOtherValidator.Random &&
                (incomingTypeValidator.Integer ||
                  incomingTypeValidator.Date) && <td></td>
              )}
            </> */}{" "}
            
          </tr>
        ))}
      </tbody>
    </>
  );
}

export default VarTableBody;
