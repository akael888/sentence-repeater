import { useState } from "react";

function LoginDebugger({ currentLink, incomingSetCurrentUser }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const link = currentLink;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${link}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      console.log("this is Data");
      console.log(data.object);

      if (res.ok) {
        setMessage(data.msg);
        incomingSetCurrentUser(data.username);
      } else {
        setMessage(`Login Failed : ${data.msg}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="border-1">
        <h3>Login Debugger</h3>
        <p>{message}</p>
        <form onSubmit={handleSubmit} className="text-black">
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          ></input>
          <input
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default LoginDebugger;
