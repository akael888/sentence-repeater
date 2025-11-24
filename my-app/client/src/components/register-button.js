import { Link } from "react-router-dom";

function RegisterButton({}) {
  return (
    <>
      <Link to={"/register"} style={{ display: "contents" }}>
        <button className="border-1 rounded-1 p-1 hover:bg-white hover:text-black text-white">
          Register
        </button>
      </Link>
    </>
  );
}

export default RegisterButton;
