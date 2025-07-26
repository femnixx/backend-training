import React from "react";
import { Outlet, Link } from "react-router-dom";

const signupPage = () => {
  return (
    <>
      <div>
        <div className="flex justify-center">
          <Link to="/" className="text-start mt-5 absolute left-5">
            Click me to come back
          </Link>
          <p className="text-center mt-5">Welcome back</p>
        </div>
        <div className="flex flex-col gap-y-5 ps-5 mt-5">
          <div className="">
            <p>username</p>
            <input
              type="username"
              className="border-1 rounded-lg px-2 mt-2"
              placeholder="JohnDoe"
            />
          </div>
          <div>
            <p>email</p>
            <input
              type="username"
              className="border-1 rounded-lg px-2 mt-2"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <p>password</p>
            <input
              type="username"
              className="border-1 rounded-lg px-2 mt-2"
              placeholder="****"
            />
          </div>
          <p>
            Already have an account?{" "}
            <strong className="hover:font-semibold hover:cursor-pointer hover:underline font-normal">
              Click here
            </strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default signupPage;
