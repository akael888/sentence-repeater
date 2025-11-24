import { motion } from "motion/react";
import { useState } from "react";

function RegisterPage({
  currentLink,
  incomingHandleCurrentUserChanges,
  incomingAuthMessageChanges,
  incomingIsRegisterFormOpen,
  incomingToggleRegisterFormOpen,
}) {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleLoginDataChanges = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${currentLink}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
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
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="p-2"
        >
          Register
        </motion.h1>
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="text-black w-full h-full border-black gap-3 grid"
          >
            <input
              className=" h-full bg-transparent text-center border-white border-b"
              name="username"
              placeholder="Username"
              value={registerData.username}
              onChange={handleLoginDataChanges}
            ></input>
            <input
              className=" h-full bg-transparent text-center border-white border-b"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleLoginDataChanges}
            ></input>
            <input
              className=" h-full bg-transparent text-center border-white border-b"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleLoginDataChanges}
              type="password"
            ></input>
            <button
              className="border-1 rounded-1 p-1 hover:bg-white bg-green-500 hover:text-black"
              type="submit"
            >
              Submit
            </button>
          </motion.div>
        </form>
      </div>
    </>
  );
}
export default RegisterPage;
