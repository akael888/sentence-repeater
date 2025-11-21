import { useState } from "react";
import Login from "./login-form";
import Register from "./register-form";

function AuthActions({
  incomingHandleCurrentUserChanges,
  incomingCurrentLink,
}) {
  const [authMessage, setAuthMessage] = useState("");

  const handleAuthMessageChanges = (message) => {
    setAuthMessage(message);
  };

  return (
    <>
      <div className="h-full items-center">
        <div className="flex justify-end items-center h-full gap-2">
          {authMessage ? (
            <div className="flex items-center justify-center h-full text-red-100">
              {authMessage}
            </div>
          ) : null}

          <Register
            currentLink={incomingCurrentLink}
            incomingHandleCurrentUserChanges={incomingHandleCurrentUserChanges}
            incomingAuthMessageChanges={handleAuthMessageChanges}
          ></Register>
          <Login
            currentLink={incomingCurrentLink}
            incomingHandleCurrentUserChanges={incomingHandleCurrentUserChanges}
            incomingAuthMessageChanges={handleAuthMessageChanges}
          ></Login>
        </div>
      </div>
    </>
  );
}

export default AuthActions;
