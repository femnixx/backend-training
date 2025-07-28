import { Outlet, Link } from "react-router-dom";
import { doc, getDoc, collection } from "firebase/firestore";
import { db, auth } from "../../backend/services/Firebase.ts";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import PickImage from "../components/PickImage.tsx";

const LandingPage = () => {
  const [username, setUsername] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  const handleSignout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.alert("Sign out successful.");
        navigate("/login");
      })
      .catch((error) => {
        window.alert("Error on signing out.");
      });
  };

  useEffect(() => {
    const stateChange = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        try {
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("Document loaded with: ", userData);
            setUsername(userData.username);
          } else {
            console.log(
              "No user profile document found for UID: ",
              firebaseUser.uid
            );
            setUsername(null);
          }
        } catch (error) {
          console.error("Error fetching profile: ", error);
          setUsername(null);
        }
      } else {
        setUsername(null);
      }
      setLoadingUser(false);
    });
    return () => stateChange();
  }, []);

  if (loadingUser) {
    return (
      <>
        <div>Loading user data</div>
      </>
    );
  }
  return (
    <div className="flex flex-col gap-y-4 ms-5 mt-5">
      <div className="flex">
        <div className="flex justify-end  w-1/2">
          <p className="">Landing page</p>
        </div>
        <div className="w-1/2 px-40">
          <p className="text-end justify-end">Hello, {username}</p>
        </div>
      </div>
      <Link to="/login" className="w-fit">
        Link to login
      </Link>
      <Link to="/signup" className="w-fit">
        Link to Signup
      </Link>
      <button onClick={handleSignout} className="hover:cursor-pointer w-fit">
        Sign out
      </button>
      if (username != null) {<PickImage />}
    </div>
  );
};

export default LandingPage;
