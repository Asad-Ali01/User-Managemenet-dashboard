import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useState } from "react";
function Router() {
   const [isAdmin,setIsAdmin] = useState(localStorage.getItem('admin') === "true")
  return (
    <div className="flex flex-col  h-screen  relative">
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
    <main className=" h-full dark:text-white dark:bg-gray-500">

      <Outlet context={isAdmin}/>
    </main>
    <div >

      <Footer />
    </div>
    </div>
  );
}

export default Router;
