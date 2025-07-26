import { Outlet, Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-y-4 ms-5 mt-5">
      <p className="text-center">Landing page</p>
      <Link to="/login">Link to login</Link>
      <Link to="/signup">Link to Signup</Link>
    </div>
  );
};

export default LandingPage;
