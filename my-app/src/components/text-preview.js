import css from './text-preview.module.css';

function Preview({ mainText, variables }) {
  function generatePreview() {
    if (mainText && variables) {
      let text = mainText;
      const newVariables = new Map();
      let currentKeyIndex = 0;
      for (const [key, value] of variables.entries()) {
        newVariables.set(key, { ...value }); // Spread operator creates new object
      }
      const variableEntries = Array.from(variables.entries());

      while (text.includes("{}") && variableEntries.length > 0) {
        const [key, value] =
          variableEntries[currentKeyIndex % variableEntries.length];
        text = text.replace("{}", "{" + String(value.name) + "}");

        console.log(
          "Text: " + text + " (Variable Index: " + currentKeyIndex + ")"
        );
        currentKeyIndex++;
      }
      console.log("New Text: " + text);
      return String(text);
    }
  }

  return (
    <>
      <div className={css["preview-container"]}>
        <h1>{mainText ? generatePreview() : "Preview"}</h1>
      </div>
    </>
  );
}

export default Preview;
