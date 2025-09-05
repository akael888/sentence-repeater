import css from "./var-table-header.module.css";

function VarTableHeader({ incomingTypeValidator , incomingOtherTypeValidator }) {
  return (
    <>
      <thead className={css["thead-name"]}>
        <tr>
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
            {incomingTypeValidator.Integer ||
            incomingTypeValidator.List ||
            incomingTypeValidator.Date ? (
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
