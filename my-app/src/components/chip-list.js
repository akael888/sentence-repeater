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
                  className={`w-full h-full inline-flex  items-center justify-center bg-opposite-color rounded-[10px] ${tw_chip_glassMorphBG}  gap-[5px]`}
                >
                  <div className={css["chip-object"]}>{value}</div>
                  <button
                    onClick={(e) => removeChip(index)}
                    className="w-[30%] h-full text-main-color  p-[5px]"
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
