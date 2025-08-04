function ShowResult({arrayResults}) {
  const rows = [];
  for (let i = 0; i < arrayResults.length; i++) {
    rows.push(
      <tr key={i}>
        <td>{arrayResults[i]}</td>
      </tr>
    );
    console.log('Text Array Results' + {arrayResults})
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Sentence</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </>
  );
}

export default ShowResult;
