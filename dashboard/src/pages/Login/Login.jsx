import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
const Login = () => {
  //getting sign in function from context
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      await signIn(email, password); // Call the signIn function from context
    } else {
      console.log("Please enter both email and password.");
    }
  };
  // Button background color condition based on email and password fields
  const buttonBgColor = email && password ? "bg-blue-600" : "bg-violet-200";
  return (
    <div className="h-screen bg-slate-400 flex justify-center items-center">
      <div className=" w-[400px] h-[350px] bg-white flex flex-col p-5 gap-3 rounded-md">
        <span className="font-bold">Log in with Email</span>
        <div className="h-[1px] w-full bg-slate-600"> </div>
        <div className="my-2">
          <input
            className="w-full p-2 border outline-none rounded-[10px] "
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-1">
          <input
            className="w-full p-2 border outline-none rounded-[10px] "
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className={`${buttonBgColor} p-1 text-white border rounded-md`}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
