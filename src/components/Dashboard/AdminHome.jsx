import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-xl">
        <span>Hi,welcome</span>
        {user?.displayName ? user.displayName : "Back"}
      </h2>

      <p>Revenue ${stats.revenue}</p>
      <p>Users :{stats.usersCount}</p>
      <p>Numeber of visas applied :{stats.myVisaApplication}</p>

      <p>Orders: {stats.orders}</p>
    </div>
  );
};

export default AdminHome;
