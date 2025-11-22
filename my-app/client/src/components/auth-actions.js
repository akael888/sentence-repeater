import { useState } from "react";
import Login from "./login-form";
import Register from "./register-form";
import { motion } from "motion/react";

function AuthActions({
  incomingHandleCurrentUserChanges,
  incomingCurrentLink,
}) {
  const [authMessage, setAuthMessage] = useState("");
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);

  const handleAuthMessageChanges = (message) => {
    setAuthMessage(message);
  };

  const toggleIsLoginFormOpen = () => {
    setIsLoginFormOpen(!isLoginFormOpen);
    if (isRegisterFormOpen) {
      setIsRegisterFormOpen(false);
    }
  };
  const toggleIsRegisterFormOpen = () => {
    setIsRegisterFormOpen(!isRegisterFormOpen);
    if (setIsLoginFormOpen) {
      setIsLoginFormOpen(false);
    }
  };

  return (
    <>
      <div className="h-full items-center">
        <div className="flex justify-end items-center h-full gap-2">
          {authMessage ? (
            <motion.div
              className="flex items-center justify-center h-full text-red-100"
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {authMessage}
            </motion.div>
          ) : null}

          <Register
            currentLink={incomingCurrentLink}
            incomingHandleCurrentUserChanges={incomingHandleCurrentUserChanges}
            incomingAuthMessageChanges={handleAuthMessageChanges}
            incomingIsRegisterFormOpen={isRegisterFormOpen}
            incomingToggleRegisterFormOpen={toggleIsRegisterFormOpen}
          ></Register>
          <Login
            currentLink={incomingCurrentLink}
            incomingHandleCurrentUserChanges={incomingHandleCurrentUserChanges}
            incomingAuthMessageChanges={handleAuthMessageChanges}
            incomingIsLoginFormOpen={isLoginFormOpen}
            incomingToggleLoginFormOpen={toggleIsLoginFormOpen}
          ></Login>
        </div>
      </div>
    </>
  );
}

export default AuthActions;
