import { Outlet, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FirebaseError, initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";

const signupPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event: React.FormEvent) => {
    event?.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User successfully created");
      alert("Sign up successful!");
      navigate("/login");
    } catch (err) {
      if (err == FirebaseError) {
        window.alert("Firebase error: " + err);
      } else {
        window.alert("Error: " + err);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSignup}>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <p>email</p>
              <input
                type="email"
                className="border-1 rounded-lg px-2 mt-2"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p>password</p>
              <input
                type="password"
                className="border-1 rounded-lg px-2 mt-2"
                placeholder="****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p>
              Already have an account?{" "}
              <Link to="/login">
                <strong className="hover:font-semibold hover:cursor-pointer hover:underline font-normal">
                  Click here
                </strong>
              </Link>
            </p>
            <button
              className="border-1 rounded-lg w-fit px-2 hover:cursor-pointer"
              type="submit"
            >
              Create user account
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default signupPage;
