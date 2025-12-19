import { motion } from "motion/react";
import { useState } from "react";

function LoginPage({
  incomingLink,
  incomingHandleCurrentUserChanges,
  incomingCurrentUser,
  incomingHandleBackEndLoadingChanges,
}) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginMessage, setLoginMessage] = useState("");

  const handleLoginDataChanges = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    incomingHandleBackEndLoadingChanges(true);
    try {
      const res = await fetch(`${incomingLink}/api/v1/auth/login`, {
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
        // incomingAuthMessageChanges(data.msg);
        incomingHandleCurrentUserChanges(data.username);
        setLoginMessage(data.msg);
      } else {
        // incomingAuthMessageChanges(`Login Failed : ${data.msg}`);
        setLoginMessage(data.msg);
      }
    } catch (error) {
      // incomingAuthMessageChanges(error.message);
      setLoginMessage(error.message);
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
          className="p-2"
        >
          Login
        </motion.h1>
        {incomingCurrentUser ? (
          <p>Logged In, Hello {incomingCurrentUser}!</p>
        ) : (
          <>
            <motion.form onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                exit={{ opacity: 0, x: 10 }}
                className="text-white w-full h-full border-black grid gap-3 text-center"
              >
                <input
                  className=" h-full bg-transparent text-center border-white border-b rounded-1"
                  name="username"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={handleLoginDataChanges}
                  required={true}
                  maxLength={10}
                  minLength={3}
                ></input>
                <div className="w-full h-full flex">
                  <input
                    className="h-full bg-transparent text-center border-white border-b rounded-1"
                    name="password"
                    placeholder="Password"
                    type={isPasswordHidden ? "text" : "password"}
                    value={loginData.password}
                    onChange={handleLoginDataChanges}
                    required={true}
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
                <button
                  className="border-1 rounded-1 p-1 hover:bg-green-700 disabled:hover:bg-transparent hover:text-black disabled:hidden text-white"
                  type="submit"
                  disabled={
                    loginData.username === "" || loginData.password === ""
                  }
                >
                  Submit
                </button>
              </motion.div>
            </motion.form>
          </>
        )}
        {loginMessage !== "" && !incomingCurrentUser ? (
          <motion.p
            className="p-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {loginMessage}
          </motion.p>
        ) : null}
      </div>
    </>
  );
}

export default LoginPage;
