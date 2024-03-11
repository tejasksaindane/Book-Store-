import { useContext, useState } from "react";
import { customToast, saveUserToDb, validateEmail } from "./functions";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../firebase/config.ts";
import { MyContext } from "../context/MyContext.tsx";

const Login = () => {
  const { setValidUser }: any = useContext(MyContext);
  const [logCreds, setLogCreds] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any): void => {
    let key = e.target.id;
    let value = e.target.value;
    setLogCreds({
      ...logCreds,
      [key]: value,
    });
  };

  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        sessionStorage.setItem("isValidUser", "true");
        const user = result.user;
        saveUserToDb({
          userName: user.displayName ? user.displayName : "",
          email: user.email ? user.email : "",
          password: user.uid ? user.uid : "",
        });
        customToast("Login Successful");
        setValidUser(true);
      })
      .catch((error) => {
        // const credential = GoogleAuthProvider.credentialFromError(error);
        customToast(error.message);
      });
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    if (validateEmail(logCreds.email)) {
      signInWithEmailAndPassword(auth, logCreds.email, logCreds.password)
        .then(() => {
          sessionStorage.setItem("isValidUser", "true");
          customToast("Loging successful");
          setValidUser(true);
        })
        .catch((error) => {
          const errorMessage = error.message;
          customToast(errorMessage);
        });
    } else {
      customToast("Please enter a valid email");
    }
  };

  return (
    <div className="flex justify-center mt-40">
      <div className="w-full max-w-sm">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center mb-5">
            <h1 className="text-lg uppercase font-bold text-zinc-700">Login</h1>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={logCreds.email}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={logCreds.password}
              required
            />
          </div>

          <div className={"flex items-center justify-between"}>
            <Link to="/sign-up">
              <Button variant="text">sign in</Button>
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="flex justify-center mt-10">
            <div className="google-btn" onClick={handleLoginWithGoogle}>
              <div className="google-icon-wrapper">
                <img
                  className="google-icon"
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png "
                />
              </div>
              <p className="">Login with google</p>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
