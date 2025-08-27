import css from "./chip-list.module.css";

function Chip({ incomingChipList }) {
  return (
    <>
      <>
        {incomingChipList != null
          ? incomingChipList.map((value, index) => (
              <>
                <span className={css["chip-object"]} contentEditable="false">
                  {value}
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
