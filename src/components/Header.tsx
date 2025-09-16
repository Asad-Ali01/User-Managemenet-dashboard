import { Button, Modal, Form, Input, message } from "antd";
import { useState } from "react";
import DarkThemeBtn from "./DarkThemeBtn";
import { NavLink } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

type LoginFormValues = {
  email: string;
  password: string;
};
function Header() {

  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [menuBar, setMenuBar] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("admin") === "true"
  );
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  const [form] = Form.useForm();
  const res = Form.useForm();
  console.log(res);
  // Handel Cancel
  const handleCancel = () => {
    setLoginModal(false);
    form.resetFields();
  };
  // Handle Login
  const handleLogin = (values: LoginFormValues) => {
    if (values.email === adminEmail && values.password === adminPassword) {
      localStorage.setItem("admin", "true");
      message.success("Login successful");
      setIsAdmin(true);
      setLoginModal(false);
      form.resetFields();
    } else {
      message.error("Invalid email or password");
    }
  };
  // Handle Login Modal
  const LoginModal = () => {
    if (isAdmin) {
      Modal.confirm({
        title: "Are you sure?",
        content: "Do you want to logout?",
        onOk: () => {
          localStorage.setItem("admin", "false");
          setIsAdmin(false);
        },
        onCancel: () => {
          localStorage.setItem("admin", "true");
          setIsAdmin(true);
        },
      });
    } else {
      setLoginModal(true);
    }
  };
console.log("Menu bar is ",menuBar);
  return (
    <nav className="w-full  ">
      <ul className={` ${menuBar ? " fixed w-full z-1000" : "flex  px-3  sm:w-full h-10 bg-gray-200 dark:bg-gray-900 dark:text-white justify-end items-center gap-10"}`}>
        {/* Left side */}
        <div className="flex items-center relative  w-full  gap-4">
          {/* Hamburger */}
          <div className={`sm:hidden absolute top-1 ${menuBar ? "absolute top-2 left-3" : ""}`}>
            <Button
              type="text"
              icon={<MenuOutlined className="!text-white !text-lg"/>}
              onClick={() => {
                menuBar ? setMenuBar(false) : setMenuBar(true)
              }}
              className="sm:hidden text-white"
            />
          </div>
          {/* <div className={`sm:flex transition-all duration-500 ease-in-out  gap-4  ${menuBar ? "h-screen   bg-gray-900  w-full flex flex-col items-center justify-center gap-5 " : " sm:h-auto hidden"}`}> */}
           <div className={`sm:flex transition-all duration-800 ease-in-out  gap-4  ${menuBar ? "h-screen   bg-gray-900  w-full flex flex-col items-center justify-center gap-5 " : "h-10 sm:h-auto sm:-translate-x-0  -translate-x-50  "}`}>
            <NavLink
            onClick={() => menuBar && setMenuBar(false)}
              to="/"
                className={({ isActive }) =>
                  `hover:text-blue-600 ${isActive  ? "text-blue-600 " : "text-white"}  ${menuBar ? "text-2xl " : ""} ${menuBar && isActive && "text-blue-600" }`
                }
            >
              Home
            </NavLink>
            {isAdmin && (
              <NavLink
              onClick={() => menuBar && setMenuBar(false)}
                to="/dashboard"
                className={({ isActive }) =>
                  `hover:text-blue-600 ${isActive  ? "text-blue-600 " : "text-white"}  ${menuBar ? "text-2xl " : ""} ${menuBar && isActive && "text-blue-600" }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>
        </div>
        {/* Right side */}
        <div className={`flex    justify-end items-center gap-6 w-full ${menuBar && "hidden"}`}>
          <Button type="primary" onClick={LoginModal} className="w-15  ">
            {isAdmin ? "Logout" : "Login"}
          </Button>
          <DarkThemeBtn />
          <Modal
            open={loginModal}
            onCancel={handleCancel}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            centered
            styles={{
              body: {
                maxHeight: "60vh",
                overflow: "auto",
              },
            }}
          >
            {/* Modal Form Login */}
            <Form layout="vertical" onFinish={handleLogin} form={form}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input name="email" placeholder="Please enter your email" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input.Password placeholder="Please enter your email" />
              </Form.Item>

              <div className="flex   justify-end">
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </div>
              {/* {} */}
            </Form>
          </Modal>
        </div>
      </ul>
    </nav>
  );
}

export default Header;
