import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import initializeFirebase from "../firebase/firebase.init";

initializeFirebase();
const useFirebase = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);

  const roleCheckUp = (email) => {
    setRole("");
    fetch(`http://localhost:5000/role/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setRole(data);
        setAdminLoading(false);
      });
  };

  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      setUser(result);
      roleCheckUp(result.user.email);
    });
  };
  const registerUser = (user) => {
    setError("");
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((result) => {
        setUser(result.user);
        toast("Successfully registered !");
        roleCheckUp(result.user.email);
        updateProfile(auth.currentUser, {
          displayName: user.name,
        }).catch((error) => {
          setError(error.message);
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const loginUser = ({ email, password }) => {
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        roleCheckUp(result.user.email);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setRole("");
      })
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserLoading(false);
        roleCheckUp(user.email);
      }
      setUserLoading(false);
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      if (role === null) {
        fetch("http://localhost:5000/user", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email: user.email, role: "user" }),
        });
      } else {
        fetch("http://localhost:5000/user", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });
      }
    }
  }, [user, role]);

  return {
    user,
    googleSignIn,
    logOut,
    error,
    registerUser,
    loginUser,
    role,
    userLoading,
    adminLoading,
  };
};
export default useFirebase;
