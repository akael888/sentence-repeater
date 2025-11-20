import { useState } from "react";

function Login({ currentLink }) {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleLoginDataChanges = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className="w-fit h-full flex border-1">
        {isLoginFormOpen ? (
          <div className="text-black w-full h-full border-1 border-black">
            <input
              className="max-w-[10dvh] h-full"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleLoginDataChanges}
            ></input>
            <input
              className="max-w-[10dvh] h-full"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginDataChanges}
            ></input>
          </div>
        ) : null}
        <button
          className="border-1 rounded-1 p-1 hover:bg-white hover:text-black"
          type="button"
          onClick={() => {
            setIsLoginFormOpen(!isLoginFormOpen);
          }}
        >
          Login
        </button>
      </form>
    </>
  );
}
export default Login;
