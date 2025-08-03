function Generator({ variables, mainText, genAmount }) {
  function generateText() {
    let genText = mainText.current.innerText;
    const newVariables = new Map(variables);
    const text = breakMainText(genText);
    console.log("Variables: " + variables);
    console.log("Main Text: " + genText);
    console.log("Gen Amount: " + genAmount);

    for (let i = 0; i < genAmount; i++) {
        for(const [key,value] of newVariables.entries){
            
        }
    }
    
    // console.log("Break Text: " + text);
  }

  const breakMainText = (text) => {
    const splitText = text.split("{}")
    return splitText;
  };

  return (
    <>
      {/* <input type="number">How many?</input> */}
      <button onClick={generateText}>Generate</button>
    </>
  );
}

export default Generator;
