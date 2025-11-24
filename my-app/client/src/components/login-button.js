import { Link } from "react-router-dom";

function LoginButton({}) {
  return (
    <>
      <Link to={"/login"} style={{ display: "contents" }}>
        <button className="border-1 rounded-1 p-1 hover:bg-white hover:text-black text-white">
          Login
        </button>
      </Link>
    </>
  );
}

export default LoginButton;
