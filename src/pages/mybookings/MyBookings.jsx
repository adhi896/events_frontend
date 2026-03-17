import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Card, Row, Col, Spin, message } from "antd";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext";

const { Meta } = Card;

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    axios
      .get("http://localhost:8000/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to load bookings");
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Row gutter={[16, 16]} style={{ padding: "20px" }}>
      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b) => {
          const locationName = b.location?.split(" - ")[0];
          const mapLink = b.location?.split(" - ")[1];

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={b.booking_id}>
              <Card hoverable style={{ borderRadius: "10px" }}>
                <Meta
                  title={b.event_name}
                  description={
                    <>
                      <p>
                        <EnvironmentOutlined /> {locationName}
                      </p>
                      <p>
                        <CalendarOutlined />{" "}
                        {new Date(b.event_time).toLocaleString()}
                      </p>
                      <p>
                        <strong>Booked on:</strong>{" "}
                        {new Date(b.booked_at).toLocaleString()}
                      </p>
                    </>
                  }
                />

                <div style={{ marginTop: "10px" }}>
                  <a href={mapLink} target="_blank" rel="noreferrer">
                    View Location
                  </a>
                </div>
              </Card>
            </Col>
          );
        })
      )}
    </Row>
  );
}