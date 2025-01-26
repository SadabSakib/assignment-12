import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import axios from "axios";
import useAxiosPublic from "./hooks/useAxiosPublic";



const SignIn = () => {
  const {
    user,
    setUser,
    loading,
    creatUser,
    signInUser,
    // handleGoogleSignIn,
    resetPass,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const provider = new GoogleAuthProvider();
  const handleGoogleSignin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        let user = res.user;
        console.log(user);
        setUser(user);
        const creationTime = user?.metadata?.creationTime;
        console.log(creationTime);

        const newUser = {
          displayName: user.displayName,
          email: user.email,
          creationTime,
          photoURL: user.photoURL,
        };
        axiosPublic.post("users", newUser).then((res) => {
          console.log(res.data);
          //  e.target.reset();
          navigate("/");
        });
        //  const email = { email: user?.email };
        // axios.post("http://localhost:5000/jwt", email, {
        //    withCredentials:true
        //  }).then((data) => {
        //    console.log(data);
        //  });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
        const lastSignInTime = result.user?.metadata?.lastSignInTime;
        console.log(lastSignInTime);
        const loginInfo = { email, lastSignInTime };

        // axios part for token generating
        const user = { email: email };
        axios
          .post("http://localhost:5000/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
          });

        fetch(`http://localhost:5000/users`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    e.target.reset();
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Sign In now</h2>
            <form onSubmit={handlSignIn}>
              <div className="form-control mb-4">
                <label className="label" for="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered w-full"
                  name="email"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label" for="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="input input-bordered w-full"
                  name="password"
                  required
                />
              </div>
              <div className="form-control">
                <button type="submit" className="btn btn-primary w-full">
                  Sign In
                </button>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-gray-500">or</span>
                <button
                  type="button"
                  onClick={() => handleGoogleSignin()}
                  className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Login with Google
                </button>
              </div>
            </form>
            <div className="text-center">
              <span className="text-sm text-gray-500">
                Dont have an account?
              </span>
              <NavLink to="/register">
                <button className="text-sm text-indigo-600 hover:underline">
                  Register
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
