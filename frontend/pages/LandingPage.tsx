import { Outlet, Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-y-4 ms-5 mt-5">
      LandingPage
      <Link to="/login">Link to login</Link>
    </div>
  );
};

export default LandingPage;
