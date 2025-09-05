import Dropdown from "react-bootstrap/Dropdown";
import Chip from "./chip-list";
import css from "./var-table-body.module.css";
import { useRef } from "react";
import VarTableRowData from "./var-table-row-data";

function VarTableBody({
  incomingVariablesBody,
  incomingHandleVariableChanges,
}) {
  //   const editableRef = useRef(null);
  return (
    <>
      <tbody className={css["tbody-name"]}>
        {Array.from(incomingVariablesBody.entries()).map(([key, values]) => (
          <tr key={key}>
            {/* <td
              contentEditable="true"
              onBlur={(e) =>
                incomingHandleVariableChanges(key, "name", e.target.innerText)
              }
              className={css["td-var-name"]}
            >
              {values.name}
            </td> */}
            <td>
              <VarTableRowData
                incomingKey={key}
                incomingValues={values}
                tableDataType={"VarName"}
                incomingchangedValues={"name"}
                incomingHandleVariableChanges={incomingHandleVariableChanges}
              ></VarTableRowData>
            </td>

            <td className={css["td-var-type"]}>
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

            <>
              {values.randomize &&
              (values.type === "Integer" || values.type === "Date") ? (
                <>
                  {values.type === "Integer" ? (
                    <>
                      {/* <td
                        contentEditable="true"
                        onBlur={(e) =>
                          incomingHandleVariableChanges(
                            key,
                            "minValue",
                            e.target.innerText
                          )
                        }
                        className={css["td-var-value"]}
                      >
                        {values.minValue}
                      </td> */}
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
                      {/* <td
                        contentEditable="true"
                        onBlur={(e) =>
                          incomingHandleVariableChanges(
                            key,
                            "maxValue",
                            e.target.innerText
                          )
                        }
                        className={css["td-var-value"]}
                      >
                        {values.maxValue}
                      </td> */}
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
                        {/* <input
                          type="date"
                          value={
                            values.minDateValue
                              ? values.minDateValue.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) => {
                            const selectedDate = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            incomingHandleVariableChanges(
                              key,
                              "minDateValue",
                              selectedDate
                            );
                          }}
                          className={css["td-var-value"]}
                        /> */}
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
                        {/* <input
                          type="date"
                          value={
                            values.maxDateValue
                              ? values.maxDateValue.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) => {
                            const selectedDate = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            incomingHandleVariableChanges(
                              key,
                              "maxDateValue",
                              selectedDate
                            );
                          }}
                          className={css["td-var-value"]}
                        /> */}
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
                        {/* <input
                          ref={editableRef}
                          type="text"
                          value={values.value}
                          onChange={(e) =>
                            incomingHandleVariableChanges(
                              key,
                              "value",
                              e.target.value
                            )
                          }
                          className={css["td-var-value"]}
                        ></input> */}
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
                        {/* <input
                          type="date"
                          value={
                            values.dateValue
                              ? values.dateValue.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) => {
                            const selectedDate = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            incomingHandleVariableChanges(
                              key,
                              "dateValue",
                              selectedDate
                            );
                          }}
                          className={css["td-var-value"]}
                        /> */}
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
                          incomingHandleVariableChanges(
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
                    incomingHandleVariableChanges(
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
                          incomingHandleVariableChanges(
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
        ))}
      </tbody>
    </>
  );
}

export default VarTableBody;
