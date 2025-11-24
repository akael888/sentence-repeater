import { motion } from "motion/react";
import LoginButton from "./login-button";
import RegisterButton from "./register-button";

function AuthButtons({}) {
  return (
    <>
      <div className="w-full h-full items-center">
        <div className="flex justify-end items-center h-full gap-2">
          <RegisterButton />
          <LoginButton />
        </div>
      </div>
    </>
  );
}

export default AuthButtons;
