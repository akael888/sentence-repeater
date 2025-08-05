import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import css from "./variable.module.css";

function Variable({ variables, variableChanges }) {
  const initializedName = useRef(new Set());

  function handleVariableChanges(key, field, value) {
    const tempVar = new Map(variables);
    const targetObj = tempVar.get(key);
    if (targetObj) {
      targetObj[field] = value;
      tempVar.set(key, targetObj);
    }
    console.log("tempvar key: " + key);
    return variableChanges(tempVar);
  }

  return (
    <>
      {variables.size > 0 ? (
        <div className={css["variable-container"]}>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Variable Name</th>
                <th>Type</th>
                <th>Start Value</th>
                <th>Iterate</th>
              </tr>
            </thead>
            <tbody>
              {variables != null
                ? Array.from(variables.entries()).map(([key, values]) => (
                    <tr key={key}>
                      <td>{values.id}</td>
                      <td
                        contentEditable="true"
                        onBlur={(e) =>
                          handleVariableChanges(key, "name", e.target.innerText)
                        }
                      >
                        {values.name}
                      </td>

                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                          >
                            {values.type}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              href="#/action-1"
                              onClick={() =>
                                handleVariableChanges(key, "type", "Integer")
                              }
                            >
                              Integer
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#/action-2"
                              onClick={() =>
                                handleVariableChanges(key, "type", "String")
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
                          handleVariableChanges(
                            key,
                            "value",
                            e.target.innerText
                          )
                        }
                      >
                        {values.value}
                      </td>
                      <td contentEditable="true">
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
                    </tr>
                  ))
                : !(<div>empty</div>)}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}

export default Variable;
