import { useState } from "react";

function Login({
  currentLink,
  incomingHandleCurrentUserChanges,
  incomingAuthMessageChanges,
}) {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleLoginDataChanges = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${currentLink}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      const data = await res.json();

      console.log("this is Data");
      console.log(data.object);

      if (res.ok) {
        incomingAuthMessageChanges(data.msg);
        incomingHandleCurrentUserChanges(data.username);
      } else {
        incomingAuthMessageChanges(`Login Failed : ${data.msg}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="w-fit h-full flex" onSubmit={handleSubmit}>
        {isLoginFormOpen ? (
          <div className="text-black w-full h-full border-black">
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
            <button
              className="border-1 rounded-1 p-1 hover:bg-white bg-green-500 hover:text-black"
              type="submit"
            >
              Submit
            </button>
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
