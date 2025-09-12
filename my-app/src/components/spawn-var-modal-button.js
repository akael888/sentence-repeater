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
      <button
        className="border-white text-white border rounded-[10px] p-[10px] hover:bg-black"
        onClick={(e) => OpenVarModal()}
      >
        Edit Variable
      </button>
    </>
  );
}

export default SpawnVarModal;
