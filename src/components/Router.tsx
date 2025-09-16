import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
function Router() {
  return (
    <div className="flex flex-col  h-screen  relative">
      <Header />
    <main className=" h-full dark:text-white dark:bg-gray-500">

      <Outlet />
    </main>
    <div className="dark:bg-gray-800">

      <Footer />
    </div>
    </div>
  );
}

export default Router;
