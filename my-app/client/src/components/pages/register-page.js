import { motion } from "motion/react";
import { useState } from "react";

function RegisterPage({
  incomingCurrentLink,
  incomingHandleCurrentUserChanges,
  incomingHandleBackEndLoadingChanges,
}) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [registerMessage, setRegisterMessage] = useState("");

  const handleLoginDataChanges = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    incomingHandleBackEndLoadingChanges(true);
    try {
      const res = await fetch(`${incomingCurrentLink}/api/v1/auth/register`, {
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

      const listMessage = data.msg;
      console.log(listMessage);
      if (res.ok) {
        setRegisterMessage(listMessage);
      } else {
        setRegisterMessage(listMessage);
      }
    } catch (error) {
      setRegisterMessage(error.message);
      console.log(error);
    }
    incomingHandleBackEndLoadingChanges(false);
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
          className="relative p-2"
        >
          Register
        </motion.h1>
        <form onSubmit={handleSubmit} >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="text-white w-full h-full border-black gap-3 grid flex justify-center items-center"
          >
            <div className="w-full h-full flex">
              <input
                className=" w-full h-full bg-transparent text-center border-white border-b rounded-1"
                name="username"
                placeholder="Username"
                value={registerData.username}
                onChange={handleLoginDataChanges}
                required={true}
                maxLength={10}
                minLength={3}
              ></input>
            </div>
            <div className="w-full h-full flex">
              <input
                className="w-full h-full bg-transparent text-center border-white border-b rounded-1"
                name="email"
                placeholder="Email"
                required={true}
                value={registerData.email}
                onChange={handleLoginDataChanges}
              ></input>
            </div>
            <div className="w-full h-full flex">
              <input
                className=" h-full bg-transparent text-center border-white border-b rounded-1"
                name="password"
                placeholder="Password"
                value={registerData.password}
                required={true}
                onChange={handleLoginDataChanges}
                type={isPasswordHidden ? "text" : "password"}
                minLength={6}
              ></input>
              <button
                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                type="button"
              >
                <img
                  src={
                    isPasswordHidden
                      ? "./svg/eye-off-dark.svg"
                      : "./svg/eye-on-dark.svg"
                  }
                  alt="password-hidden-logo"
                  className="h-auto w-[30px] p-1"
                ></img>
              </button>
            </div>

            <motion.button
              className="border-1 rounded-1 p-1 hover:bg-green-700  hover:text-black  text-white  disabled:hidden"
              type="submit"
              disabled={
                registerData.email === "" ||
                registerData.password === "" ||
                registerData.username === ""
              } 
            >
              Submit
            </motion.button>
          </motion.div>
        </form>
        {registerMessage !== "" ? (
          <motion.div
            className="p-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {registerMessage}
          </motion.div>
        ) : null}
      </div>
    </>
  );
}
export default RegisterPage;
