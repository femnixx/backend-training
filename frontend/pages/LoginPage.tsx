import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError, initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { auth } from "../../backend/services/Firebase.ts";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      window.alert("Successfully logged in!");
      console.log("Successfully logged in with user: " + { user });
      navigate("/");
    } catch (err) {
      if (err == FirebaseError) {
        window.alert("Firebase error: " + err);
        console.log("Firebase error: " + err);
      } else {
        window.alert("Unknown error: " + err);
        console.log("Unknown error: " + err);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <div className=" bg-gray-400 ms-4">
          <div className="bg-white flex flex-col gap-y-3">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="gap-y-3">
              <p>Password</p>
              <input
                type="password"
                className="border-1 rounded-lg px-2"
                placeholder="****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="mt-2">
              Don't have an account?{" "}
              <Link to="/signup">
                <strong className="hover:underline font-normal hover:font-semibold hover:cursor-pointer">
                  Click here
                </strong>
              </Link>
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="border-1 px-2 ms-3 mt-5 rounded-lg hover:cursor-pointer"
        >
          Sign In
        </button>
      </form>
    </>
  );
};

export default LoginPage;
