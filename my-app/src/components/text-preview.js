import css from './text-preview.module.css';

function Preview({ incomingPreviewText, incomingVariables }) {
  function generatePreview() {
    if (incomingPreviewText && incomingVariables) {
      let text = incomingPreviewText;
      const newincomingVariables = new Map();
      let currentKeyIndex = 0;
      for (const [key, value] of incomingVariables.entries()) {
        newincomingVariables.set(key, { ...value }); 
      }
      const variableEntries = Array.from(incomingVariables.entries());

      while (text.includes("{}") && variableEntries.length > 0) {
        const [key, value] =
          variableEntries[currentKeyIndex % variableEntries.length];
        text = text.replace("{}", "{" + String(value.name) + "}");

        //DEBUG LOG--------------------------
        console.log(
          "Text inside generatedPreview() : " + text + " (on this Variable Index: " + currentKeyIndex + ")"
        );
        //-------------------------------------

        currentKeyIndex++;
      }

      //DEBUG LOG--------------------------
      console.log("Generated Text from generatePreview(): " + text);
      //-------------------------------------

      return String(text);
    }
  }

  return (
    <>
      <div className={css["preview-container"]}>
        <h1>{incomingPreviewText ? generatePreview() : "Preview"}</h1>
      </div>
    </>
  );
}

export default Preview;
