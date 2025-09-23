
import { NavLink } from "react-router-dom";
import Login from "./Login";
// import { useState,useEffect } from "react";
type Props = {
    isAdmin:boolean
    setIsAdmin:(v:boolean) => void
}
function Header({isAdmin,setIsAdmin}:Props) {

  return (
    <nav className="w-full  ">
      <ul className="flex  px-3  sm:w-full h-10 bg-gray-200 dark:bg-gray-900 dark:text-white justify-end items-center gap-10">
        {/* Left side */}
        <div className="flex items-center relative  w-full  gap-4">
          
        
           <div className="flex transition-all duration-800 ease-in-out  gap-4 ">
            
            {isAdmin && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `hover:text-blue-600 ${isActive  ? "text-blue-600 " : "text-white"}  `
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>
          <Login isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
        </div>
       
      </ul>
    </nav>
  );
}

export default Header;
