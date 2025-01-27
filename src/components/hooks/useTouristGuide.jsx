import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const axiosSecure = useAxiosSecure();
  const { data: isTourGuide, isPending } = useQuery({
    queryKey: [user?.email, "istourGuide"],
    queryFn: async () => {
      const res = await axiosSecure.get(`user/touristGuide/${user.email}`);
      console.log(res.data);
      return res.data?.tourGuide;
    },
  });
  return [isTourGuide, isPending];
};

export default useAdmin;
