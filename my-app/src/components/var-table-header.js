import css from "./var-table-header.module.css";

function VarTableHeader({ incomingTypeValidator, incomingOtherTypeValidator }) {
  return (
    <>
      <thead
        className={
          "w-screen h-full text-white rounded-[10px] p-[15px] shrink-1"
        }
      >
        <tr>
          {/* <th>id</th> */}
          <th className="p-[15px]">Variable Name</th>
          <th className="p-[15px]">Type</th>
          <th className="p-[15px]">Start Value</th>
          <>
            {incomingOtherTypeValidator.Random &&
            (incomingTypeValidator.Integer || incomingTypeValidator.Date) ? (
              <th className="p-[15px]">End Value</th>
            ) : null}
          </>
          <>
            {incomingTypeValidator.Integer ||
            incomingTypeValidator.List ||
            incomingTypeValidator.Date ? (
              <th className="p-[15px]">Iterate</th>
            ) : null}
          </>
          <>
            {(incomingTypeValidator.Integer ||
              incomingTypeValidator.List ||
              incomingTypeValidator.Date) &&
            incomingOtherTypeValidator.Iterate ? (
              <th className="p-[15px]">Inteval</th>
            ) : null}
          </>
          <>
            {incomingTypeValidator.Integer ||
            incomingTypeValidator.List ||
            incomingTypeValidator.Date ? (
              <th className="p-[15px]">Randomize</th>
            ) : null}
          </>
        </tr>
      </thead>
    </>
  );
}

export default VarTableHeader;
