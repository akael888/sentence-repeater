import { useState } from "react";

function Login({}) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log("this is Data");
      console.log(data.object);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage(`Login Successful, ${data.token}`);
      } else {
        setMessage(`Login Failed : ${data.msg}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
      <p>{message}</p>
    </>
  );
}

export default Login;
