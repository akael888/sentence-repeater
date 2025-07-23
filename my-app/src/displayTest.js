import Admin from "./adminTest";
import Other from "./otherTest";

function Display({ count }) {
  return <div>{count > 5 ? <Admin /> : <Other />}</div>;
}

export default Display;
