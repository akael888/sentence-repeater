import css from "./chip-list.module.css";

function Chip({
  incomingVariableIndex,
  incomingChipList,
  incomingHandleVariableChanges,
}) {
  function removeChip(indexToRemove) {
    const removedList = incomingChipList.filter(
      (_, index) => index !== indexToRemove
    );
    incomingHandleVariableChanges(incomingVariableIndex, "list", removedList);
  }

  return (
    <>
      <>
        {incomingChipList != null
          ? incomingChipList.map((value, index) => (
              <>
                <span className={css["chip-object"]} contentEditable="false">
                  {value}

                  <button onClick={(e) => removeChip(index)}> X </button>
                </span>
                <span> </span>
              </>
            ))
          : ""}
      </>
    </>
  );
}

export default Chip;
