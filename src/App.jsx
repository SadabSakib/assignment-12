import { NavLink, useLoaderData } from "react-router-dom";
import "./App.css";
import CoffeeCard from "./components/CoffeeCard";
import { useState } from "react";
import ThemeToggle from "./components/Visa/ThemeToggle";

function App() {
  const loadedCoffees = useLoaderData();
  
  const [coffees, setCoffees] = useState(loadedCoffees);
  return (
    <>
      <div className="mb-3">
        <ThemeToggle></ThemeToggle>
        <NavLink className="bg-gray-400 mr-2 p-2" to={"/"}>
          HOME
        </NavLink>
        <NavLink to={"/addCoffee"} className="bg-red-500 p-2 ">
          ADD COFFEE
        </NavLink>
        <NavLink to={"/signin"} className="bg-blue-700 p-2 ml-2">
          SIGN IN
        </NavLink>
        <NavLink to={"/users"} className="bg-green-600 p-2 ml-2">
          USERS
        </NavLink>
     
      </div>

      {/* eta use kormu header a navbar hisebe */}
      
      cold coffee {coffees.length}
      {coffees.map((coffee) => (
        <CoffeeCard
          key={coffee._id}
          coffee={coffee}
          coffees={coffees}
          setCoffees={setCoffees}
        ></CoffeeCard>
      ))}
    </>
  );
}

export default App;
