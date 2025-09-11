import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "antd";
function Dashboard() {
  const location = useLocation();
  const isDashBoardOnRoot = location.pathname === "/dashboard";
  return (
    <div className="flex flex-col justify-center align-center  h-full relative">
     
    {
      isDashBoardOnRoot == false ? <Link to="/dashboard" className="absolute top-0">
            <Button type="primary" shape="round">Go back</Button>
          </Link>
          :
          <div className="flex gap-10 justify-center">
          <Link to="/dashboard/adduser">
            <Button type="default" shape="round" size="large">Add User</Button>
          </Link>
          <Link to="/dashboard/deleteuser">
            <Button type="default" shape="round" size="large">Delete User</Button>
          </Link>
         
        </div>
    }
       
      <Outlet />
    </div>
  );
}

export default Dashboard;
