import css from "./chip-list.module.css";

function Chip({
  incomingVariableIndex,
  incomingChipList,
  incomingHandleVariableChanges,
}) {
  let tw_chip_glassMorphBG =
    " bg-[color-mix(in_srgb,var(--opposite-color)_50%,transparent)] backdrop-blur-[10px]";
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
                <div
                  className={`w-full h-full inline-flex bg-opposite-color rounded-[10px] ${tw_chip_glassMorphBG}`}
                >
                  <span className={css["chip-object"]}>{value}</span>
                  <span> </span>
                  <button
                    onClick={(e) => removeChip(index)}
                    className="w-[30%] h-full text-main-color"
                  >
                    {" "}
                    X{" "}
                  </button>
                </div>
              </>
            ))
          : ""}
      </>
    </>
  );
}

export default Chip;
