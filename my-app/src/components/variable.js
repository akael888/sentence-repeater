function Variable({ variables }) {
  return (
    <div className="variable-container">
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(variables.entries()).map(([key, values]) => (
            <tr key={key}>
              <td>{values.name}</td>
              <td>{values.type}</td>
              <td>{values.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Variable;
