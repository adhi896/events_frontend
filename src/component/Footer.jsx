import { Layout } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer
      style={{
        textAlign: "center",
        background: "#f0f2f5",
      }}
    >
      <p style={{ marginBottom: "10px" }}>
        © {new Date().getFullYear()} EventHub. All rights reserved.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <a href="#" target="_blank">
          <GithubOutlined style={{ fontSize: "20px" }} />
        </a>
        <a href="#" target="_blank">
          <LinkedinOutlined style={{ fontSize: "20px" }} />
        </a>
        <a href="#" target="_blank">
          <GlobalOutlined style={{ fontSize: "20px" }} />
        </a>
      </div>
    </Footer>
  );
}