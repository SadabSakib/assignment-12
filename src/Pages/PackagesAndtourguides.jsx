import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TourGuideCard from "./TourGuideCard";
import PackageCard from "./PackageCard";
import useAxiosPublic from "../components/hooks/useAxiosPublic";

const fetchRandomPackages = async () => {
  const response = await fetch("/api/packages/random");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchRandomTourGuides = async () => {
  const response = await fetch("/api/tour-guides/random");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};


const axiosPublic=useAxiosPublic()
const PackagesAndtourguides = () => {
  // const {
  //   data: packages,
  //   error: packagesError,
  //   isLoading: packagesLoading,
  // } = useQuery({
  //   queryKey: ["randomPackages"],
  //   queryFn: fetchRandomPackages,
  // });

  // const {
  //   data: tourGuides,
  //   error: tourGuidesError,
  //   isLoading: tourGuidesLoading,
  // } = useQuery({
  //   queryKey: ["randomTourGuides"],
  //   queryFn: fetchRandomTourGuides,
  // });



  
  const [packages,setPackages]=useState([])
    useEffect(() => {
      axiosPublic.get("/api/packages/random").then(res => {
        setPackages(res.data)
        console.log(res.data)
      });
    },[])
  const [tourGuides, setTourGuides] = useState([]);
    useEffect(() => {
      axiosPublic.get("/api/tour-guides/random").then((res) => {
        setTourGuides(res.data);
        console.log(res.data);
      });
    },[])
  // if (packagesLoading || tourGuidesLoading) return <div>Loading...</div>;
  // if (packagesError) return <div>Error: {packagesError.message}</div>;
  // if (tourGuidesError) return <div>Error: {tourGuidesError.message}</div>;

  return (
    <div className="tourism-travel-guide">
      <Tabs>
        <TabList>
          <Tab>Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages?.map((pkg) => (
              <PackageCard key={pkg._id} singlePackage={pkg} />
            ))}
            
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4">
            {tourGuides.map((guide) => (
              <TourGuideCard key={guide._id} guide={guide} />
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PackagesAndtourguides;
