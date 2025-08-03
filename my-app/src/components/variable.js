function Variable({ variables }) {
  return (
    <div className="variable-container">
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Type</th>
            <th>Value</th>
            <th>Loc</th>
          </tr>
        </thead>
        <tbody>
          {variables != null
            ? Array.from(variables.entries()).map(([key, values]) => (
                <tr key={key}>
                  <td>{values.name}</td>
                  <td>{values.type}</td>
                  <td>{values.value}</td>
                  <td>{values.loc}</td>
                </tr>
              ))
            : !<div>empty</div>}
        </tbody>
      </table>
    </div>
  );
}

export default Variable;
