import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";

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
                </tr>
              ))
            : !(<div>empty</div>)}
        </tbody>
      </table>
    </div>
  );
}

export default Variable;
