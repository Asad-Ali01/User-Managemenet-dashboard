import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "antd";
import {motion} from 'framer-motion'
function Dashboard() {
  const location = useLocation();
  const isDashBoardOnRoot = location.pathname === "/dashboard";
  return (
   

   
    <div className="flex flex-col justify-center align-center dark:bg-gray-800   h-full relative">
      <motion.div
     initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
    {
      isDashBoardOnRoot == false ? <Link to="/dashboard" className="absolute top-0">
            <Button type="primary" className="top-2 left-2">Go back</Button>
          </Link>
          :
          <div className="flex gap-10 justify-center">
          <Link to="/dashboard/adduser">
            <Button type="default" shape="round" size="large" className="dark:!bg-gray-700 ">Add User</Button>
          </Link>
          <Link to="/dashboard/deleteuser">
            <Button type="default" shape="round" size="large" className="dark:!bg-gray-700  ">Delete User</Button>
          </Link>
         
        </div>
    }
       
      <Outlet />
     </motion.div>
    </div>
  );
}

export default Dashboard;
