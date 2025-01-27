import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
// import { AuthContext } from "../../provider/AuthProvider";
// import React from 'react';

// const axiosInstance = axios.create({
//   baseURL: "localhost:5000/",
//   withCredentials: true,
// });
const axiosInstance = axios.create({
  baseURL: "https://assignment-12-server-beige-two.vercel.app/",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { handleSignOut } = useContext(AuthContext);
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        console.log("interceptor err:", err);
        if (err.status === 401 || err.status === 403) {
          console.log("need to logout the user");
          handleSignOut();
        }
        return Promise.reject(err);
      }
    );
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;
