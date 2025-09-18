function VarTableHeader({ incomingTypeValidator, incomingOtherTypeValidator }) {
  return (
    <>
      <thead
        className={
          " h-full text-white rounded-[10px] shrink-1 p-[15px] pr-[20px] pl-[20px]"
        }
      >
        <tr className=" [&>*]:p-[15px]">
          {/* <th>id</th> */}
          <th className="w-1/3">Variable Name</th>
          <th className="w-1/2">Type</th>
          <th className="w-1/2">Open Variable</th>
          {/* <th>Start Value</th>
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
          </> */}
        </tr>
      </thead>
    </>
  );
}

export default VarTableHeader;
