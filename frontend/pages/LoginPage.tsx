import { Outlet, Link } from "react-router-dom";

const LoginPage = () => {
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
        </div>
      </div>
    </>
  );
};

export default LoginPage;
