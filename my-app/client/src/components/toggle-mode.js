import Toggle from "react-bootstrap/Form";

function Mode({ currentState, darkModeChanges }) {
  return (
    <>
      <Toggle>
        <Toggle.Check onChange={darkModeChanges} type="switch" />
      </Toggle>
    </>
  );
}

export default Mode;
