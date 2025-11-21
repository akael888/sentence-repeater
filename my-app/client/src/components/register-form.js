import { useState } from "react";

function Register({
  currentLink,
  incomingHandleCurrentUserChanges,
  incomingAuthMessageChanges,
}) {
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);

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
      console.log(error);
    }
  };

  return (
    <>
      <form className="w-fit h-full flex" onSubmit={handleSubmit}>
        {isRegisterFormOpen ? (
          <div className="text-black w-full h-full border-black">
            <input
              className="max-w-[10dvh] h-full"
              name="username"
              placeholder="Username"
              value={registerData.username}
              onChange={handleLoginDataChanges}
            ></input>
            <input
              className="max-w-[10dvh] h-full"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleLoginDataChanges}
            ></input>
            <input
              className="max-w-[10dvh] h-full"
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
          </div>
        ) : null}
        <button
          className="border-1 rounded-1 p-1 hover:bg-white hover:text-black"
          type="button"
          onClick={() => {
            setIsRegisterFormOpen(!isRegisterFormOpen);
          }}
        >
          Register
        </button>
      </form>
    </>
  );
}
export default Register;
