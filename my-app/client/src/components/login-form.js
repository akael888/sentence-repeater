import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

function Login({
  currentLink,
  incomingHandleCurrentUserChanges,
  incomingAuthMessageChanges,
  incomingIsLoginFormOpen,
  incomingToggleLoginFormOpen,
}) {
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
      incomingAuthMessageChanges(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <motion.form className="w-fit h-full flex gap-1" onSubmit={handleSubmit}>
        {incomingIsLoginFormOpen ? (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            exit={{ opacity: 0, x: 10 }}
            className="text-black w-full h-full border-black flex gap-1"
          >
            <input
              className="max-w-full h-full"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleLoginDataChanges}
            ></input>
            <input
              className="max-w-full h-full"
              name="password"
              placeholder="Password"
              type="password"
              value={loginData.password}
              onChange={handleLoginDataChanges}
            ></input>
            <button
              className="border-1 rounded-1 p-1 hover:bg-white bg-green-500 hover:text-black"
              type="submit"
            >
              Submit
            </button>
          </motion.div>
        ) : null}

        <button
          className="border-1 rounded-1 p-1 hover:bg-white hover:text-black text-white"
          type="button"
          onClick={() => {
            incomingToggleLoginFormOpen();
          }}
        >
          Login
        </button>
      </motion.form>
    </>
  );
}

export default Login;
