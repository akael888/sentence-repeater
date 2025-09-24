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
        className="border-white text-white border rounded-[10px] p-[10px] hover:shadow-[0_0_30px_rgba(100,100,100,0.35)] hover:bg-white hover:bg-opacity-10 text-sm"
        onClick={(e) => OpenVarModal()}
        whileTap={{ scale: 0.9 }}
      >
       ✎ Edit 
      </motion.button>
    </>
  );
}

export default SpawnVarModal;
