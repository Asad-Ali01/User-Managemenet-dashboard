import { useState } from "react";
import { message, Modal, Input, Form, Button } from "antd";
import DarkThemeBtn from "./DarkThemeBtn";
import {  useNavigate } from "react-router-dom";
type LoginFormValues = {
  email: string;
  password: string;
};
type Props = {
    isAdmin:boolean
    setIsAdmin:(v:boolean) => void
}
function Login({isAdmin,setIsAdmin}:Props) {
  const [loginModal, setLoginModal] = useState<boolean>(false);
const navigate = useNavigate();

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const [form] = Form.useForm();

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
      navigate('/dashboard',{replace:true})
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
          navigate('/',{replace:true})
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

  return (
   <>
    {/* Right side */}
        <div className={`flex    justify-end items-center gap-6 w-full `}>
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
                <Input.Password placeholder="Please enter your password" />
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
   </>
  );
}
export default Login;
