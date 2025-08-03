import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";

function Variable({ variables, variableChanges }) {
  function handleVariableChanges(key, field, value) {
    const tempVar = new Map(variables);
    const [targetKey, targetObj] = Array.from(variables.entries())[key];
    targetObj[field] = value;
    console.log("tempvar key: " + key);
    tempVar.set(targetKey, targetObj);
    return variableChanges(tempVar);
  }

  return (
    <div className="variable-container">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Varibale Name</th>
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
                  <td contentEditable="true">{values.name}</td>

                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
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
                  <td contentEditable="true">{values.value}</td>
                  <td contentEditable="true">
                    <div>
                      <label>
                        <input type="checkbox" checked={values.iterate} onClick={() => handleVariableChanges(key,'iterate',!(values.iterate))} />
                      </label>
                    </div>
                  </td>
                </tr>
              ))
            : !(<div>empty</div>)}
        </tbody>
      </table>
    </div>
  );
}

export default Variable;
