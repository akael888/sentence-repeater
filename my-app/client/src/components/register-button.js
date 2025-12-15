import { Link } from "react-router-dom";

function RegisterButton({}) {
  return (
    <>
      <Link to={"/register"} style={{ display: "contents" }}>
        <button className="border-1 rounded-1 p-1 dark:hover:bg-amber-800 hover:bg-amber-500 hover:text-black text-opposite-color dark:text-white dark:border-white border-opposite-color">
          Register
        </button>
      </Link>
    </>
  );
}

export default RegisterButton;
