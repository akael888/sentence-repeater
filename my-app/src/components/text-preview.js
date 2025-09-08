import css from "./text-preview.module.css";

function Preview({ incomingPreviewText, incomingVariables }) {
  function generatePreviewandVariables() {
    let previewText = "Preview Text";
    console.log(
      "Generated Text from incomingpreviewtext: " +
        "-" +
        incomingPreviewText.charCodeAt(0) +
        "-"
    );
    if (incomingPreviewText && incomingVariables) {
      if (incomingPreviewText.charCodeAt(0) != 10) {
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

          if (value.name !== "") {
            text = text.replace("{}", "{" + String(value.name) + "}");
          } else {
            text = text.replace("{}", "{" + "Variable " + String(key) + "}");
          }

          //DEBUG LOG--------------------------
          console.log(
            "Text inside generatedPreview() : " +
              text +
              " (on this Variable Index: " +
              currentKeyIndex +
              ")"
          );
          //-------------------------------------

          currentKeyIndex++;
        }

        //DEBUG LOG--------------------------
        console.log(
          "Generated Text from generatePreviewandVariables(): " +
            "-" +
            text +
            "-"
        );

        //-------------------------------------

        return String(text);
      } else return previewText;
    } else return previewText;
  }

  return (
    <>
      <div className={css["preview-container"]}>
        <h1>{generatePreviewandVariables()}</h1>
      </div>
    </>
  );
}

export default Preview;
