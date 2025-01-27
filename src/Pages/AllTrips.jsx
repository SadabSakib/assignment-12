import React from 'react';
import useAxiosPublic from '../components/hooks/useAxiosPublic';

const AllTrips = () => {
    const axiosPublic=useAxiosPublic()
    const [packages,setPackages]=useState([])
        useEffect(() => {
          axiosPublic.get("/api/allPackages/random").then(res => {
            setPackages(res.data)
            console.log(res.data)
          });
        },[axiosPublic])
     
    return (
        <div>
            AllTrips
        </div>
    );
};

export default AllTrips;