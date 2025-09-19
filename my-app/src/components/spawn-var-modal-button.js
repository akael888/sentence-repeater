import { motion, scale } from "motion/react";
import { useState } from "react";

function SpawnVarModal({
  incomingSelectedVariable,
  incomingHandleModalOnChangeforSpawn,
  incomingHandleCurrentVariableSet,
  incomingHandleSelectedKey,
}) {
  function OpenVarModal() {
    incomingHandleCurrentVariableSet(
      incomingSelectedVariable,
      incomingHandleSelectedKey
    );
    incomingHandleModalOnChangeforSpawn(true);
    console.log("Edited Var:", incomingSelectedVariable);
  }

  return (
    <>
      <motion.button
        className="border-white text-white border rounded-[10px] p-[10px] hover:bg-black"
        onClick={(e) => OpenVarModal()}
        whileTap={{ scale: 0.9 }}
      >
        Edit Variable
      </motion.button>
    </>
  );
}

export default SpawnVarModal;
