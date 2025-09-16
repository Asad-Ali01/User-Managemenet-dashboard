import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Router from "./components/Router";
import UserBasicInfo from "./components/UserBasicInfo";
import AddUser from "./components/AddUser";
import Dashboard from "./components/DashBoard";
import DeleteUser from "./components/DeleteUser";
import '@ant-design/v5-patch-for-react-19';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
    <QueryClientProvider client={queryClient}>
    
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Router />}>
            <Route index element={<UserBasicInfo />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="adduser" element={<AddUser />} />
              <Route path="deleteuser" element={<DeleteUser />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
      
    </QueryClientProvider>
  </StrictMode>
);
