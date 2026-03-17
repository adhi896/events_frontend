import { useState } from "react";
import axios from "axios";
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
  UserOutlined,
  PhoneOutlined,
  LockOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import loginBackground from "../../assets/login.jpg";
import AppFooter from "../../component/Footer";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/auth/register",
        {
          name: values.name,
          phone: values.phone,
          password: values.password,
        }
      );

      message.success("Registration Successful 🎉");
      navigate("/");

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

        {/* Left Form Section (reversed) */}
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
            title="Signup"
            style={{
              width: 350,
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Form layout="vertical" onFinish={handleSignup}>

              <Form.Item
                name="name"
                rules={[{ required: true, message: "Enter your name" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Name"
                  size="large"
                />
              </Form.Item>

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
                  icon={<UserAddOutlined />}
                  loading={loading}
                  block
                  size="large"
                >
                  Signup
                </Button>
              </Form.Item>

              <div style={{ textAlign: "center" }}>
                <a href="/">Already have an account? Login</a>
              </div>

            </Form>
          </Card>
        </Col>

        {/* Right Image Section */}
        <Col xs={0} md={12}>
          <img
            src={loginBackground}
            alt="signup"
            style={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
            }}
          />
        </Col>

      </Row>

      <AppFooter />
    </>
  );
}