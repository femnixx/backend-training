import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className=" bg-gray-400 ms-4">
        <div className="bg-white flex flex-col">
          <div className="flex justify-center">
            <Link to="/" className="text-start mt-5 absolute left-5">
              Click me to come back
            </Link>
            <p className="text-center mt-5">Welcome back</p>
          </div>
          <div className="gap-y-3 mt-5">
            <p>Email</p>
            <input
              type="email"
              className="border-1 rounded-lg px-2"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="gap-y-3">
            <p>Password</p>
            <input
              type="password"
              className="border-1 rounded-lg px-2"
              placeholder="****"
            />
          </div>
          <p>
            Don't have an account?{" "}
            <Link to="/signup">
              <strong className="hover:underline font-normal hover:font-semibold hover:cursor-pointer">
                Click here
              </strong>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
