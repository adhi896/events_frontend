import { Layout, Button, Space } from "antd";
import {
  CalendarOutlined,
  BookOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export default function AppHeader({ onMyBookings }) {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Header
      style={{
        background: "#ffffff",
        padding: "0 40px",
        height: "70px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo / Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: "600",
          fontSize: "20px",
          color: "#1f1f1f",
          cursor: "pointer",
        }}
        onClick={() => navigate("/events")}
      >
        <CalendarOutlined style={{ fontSize: "22px", color: "#1677ff" }} />
        Events Management
      </div>

      {/* Right Side */}
      {token && (
        <Space size="middle">
          

          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Space>
      )}
    </Header>
  );
}