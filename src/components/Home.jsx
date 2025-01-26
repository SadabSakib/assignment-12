import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Slider from "./Visa/SliderWithAnimation/Slider";
import AllTrips from "../Pages/AllTrips";
import PackageCard from "../Pages/PackageCard";
import { useQuery } from "@tanstack/react-query";
import Banner from "./HomeComponents.jsx/Banner";
import Overview from "./HomeComponents.jsx/Overview";
import axios from "axios";
import useAxiosPublic from "./hooks/useAxiosPublic";
import PackagesAndtourguides from "../Pages/PackagesAndtourguides";
const axiosPublic = useAxiosPublic();
const Home = () => {
  // const fetchRandomPackages = async () => {
  //   const response = await fetch("/api/packages/random");
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   return response.json();
  // };
  // const {
  //   data: packages,
  //   // error: packagesError,
  //   isLoading: packagesLoading,
  // } = useQuery({
  //   queryKey: ["randomPackages"],
  //   queryFn: fetchRandomPackages,
  // });

  // if (packagesLoading) return <div>Loading...</div>;
  // if (packagesError) return <div>Error: {packagesError.message}</div>;
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    axiosPublic.get("/api/packages/random").then((res) => {
      setPackages(res.data);
      console.log(res.data);
    });
  }, []);
  console.log(packages);
  return (
    <div className=" flex flex-col items-center justify-center">
      <Slider></Slider>
      <Overview></Overview>
      {/* <AllTrips></AllTrips> */}
      {/* <PackageCard></PackageCard> */}

      <PackagesAndtourguides></PackagesAndtourguides>
    </div>
  );
};

export default Home;
