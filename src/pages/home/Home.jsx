import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  message,
  Row,
  Col,
} from "antd";
import {
  PhoneOutlined,
  LockOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext";
import loginBackground from "../../assets/login.jpg";
import AppFooter from "../../component/Footer";

export default function Home() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/auth/login",
        {
          phone: values.phone,
          password: values.password,
        }
      );

      message.success("Login Successful 🚀");
      login(res.data.access_token);
      navigate("/events");

    } catch (error) {
      if (error.response) {
        message.error(error.response.data.detail);
      } else if (error.request) {
        message.error("Server not responding");
      } else {
        message.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Row style={{ minHeight: "100vh" }}>
      
      {/* Left Image Section */}
      <Col xs={0} md={12}>
        <img
          src={loginBackground}
          alt="login"
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
          }}
        />
      </Col>

      {/* Right Form Section */}
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f7fa",
        }}
      >
        <Card
          title="Login"
          style={{
            width: 350,
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Form layout="vertical" onFinish={handleLogin}>
            
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Enter phone number" }]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Phone Number"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Enter password" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<LoginOutlined />}
                loading={loading}
                block
                size="large"
              >
                Login
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <a href="/signup">
                Don't have an account? Signup here
              </a>
            </div>

          </Form>
        </Card>
      </Col>
    </Row>
<AppFooter/>
</>
  );
}