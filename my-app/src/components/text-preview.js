import css from "./text-preview.module.css";
import { motion } from "motion/react";
function Preview({ incomingPreviewText, incomingVariables }) {
  //Tailwind Styles
  let tw_preview_glassMorphBG =
    " bg-[color-mix(in_srgb,var(--main-color)_20%,transparent)] backdrop-blur-[10px]";
  // let tw_preview_animation =
  //   " animate-[fadeInTop_2s_ease_0s_1_normal_forwards]";

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
      <motion.div
        className={
          "w-fit h-auto max-w-[80%] flex items-center text-center text-main-color m-auto p-2.5 rounded-[10px] overflow-auto" +
          tw_preview_glassMorphBG
        }
        initial={{ opacity: 0, y: -100, height: 0 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
      >
        <h1 className="w-full ">{generatePreviewandVariables()}</h1>
      </motion.div>
    </>
  );
}

export default Preview;

// "w-fit h-full grid text-main-color m-auto p-2.5 rounded-[10px]" +
// tw_preview_glassMorphBG +
// tw_preview_animation
