import css from "./var-table-header.module.css";

function VarTableHeader({ incomingTypeValidator, incomingOtherTypeValidator }) {
  return (
    <>
      <thead
        className={
          "w-screen h-full text-white rounded-[10px] p-[15px] shrink-1"
        }
      >
        <tr className=" [&>*]:p-[15px]">
          {/* <th>id</th> */}
          <th>Variable Name</th>
          <th>Type</th>
          <th>Start Value</th>
          <>
            {incomingOtherTypeValidator.Random &&
            (incomingTypeValidator.Integer || incomingTypeValidator.Date) ? (
              <th>End Value</th>
            ) : null}
          </>
          <>
            {incomingTypeValidator.Integer ||
            incomingTypeValidator.List ||
            incomingTypeValidator.Date ? (
              <th>Iterate</th>
            ) : null}
          </>
          <>
            {(incomingTypeValidator.Integer ||
              incomingTypeValidator.List ||
              incomingTypeValidator.Date) &&
            incomingOtherTypeValidator.Iterate ? (
              <th>Inteval</th>
            ) : null}
          </>
          <>
            {incomingTypeValidator.Integer ||
            incomingTypeValidator.List ||
            incomingTypeValidator.Date ? (
              <th>Randomize</th>
            ) : null}
          </>
        </tr>
      </thead>
    </>
  );
}

export default VarTableHeader;
