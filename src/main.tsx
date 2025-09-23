import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Router from "./components/Router";
import DashBoard from "./components/DashBoard";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import '@ant-design/v5-patch-for-react-19';
import HomePage from "./components/HomePage";
import AdminWrapper from "./components/AdminWrapper";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
    <QueryClientProvider client={queryClient}>
    
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Router />}>
          
            <Route index  element={
           <HomePage/>
              } />
           {/* dashboard */}
            <Route index path="dashboard" element={
              <AdminWrapper>

                <DashBoard />
              </AdminWrapper>
              }/>
              {/* adduser */}
             <Route path="adduser" element={
              <AdminWrapper>

                <AddUser />
              </AdminWrapper>
              }/>
              {/* delete user */}
               <Route path="deleteuser" element={
              <AdminWrapper>

                <AddUser />
              </AdminWrapper>
              }/>
          {/* Edit user */}
           <Route path="edituser/:userID" element={
              <AdminWrapper>

                <EditUser />
              </AdminWrapper>
              }/>
              
          </Route>

        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
      
    </QueryClientProvider>
  </StrictMode>
);
