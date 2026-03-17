import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Card, Button, Row, Col, message, Spin, Modal } from "antd";
import { EnvironmentOutlined, CalendarOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext"
import EventImg from "../../assets/event-image.jpg"
import AppHeader from "../../component/Header";
import AppFooter from "../../component/Footer";

const { Meta } = Card;

export default function ListEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    axios
      .get("http://localhost:8000/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);

        if (Array.isArray(response.data.data)) {
          setEvents(response.data.data);
        } else {
          setEvents([]);
          message.warning("Unexpected data format from server");
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        message.error("Failed to load events");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const fetchBookings = async () => {
    try {
      setBookingLoading(true);

      const res = await axios.get("http://localhost:8000/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);

    } catch (err) {
      console.error(err);
      message.error("Failed to load bookings");
    } finally {
      setBookingLoading(false);
    }
  };

  const openBookingsModal = () => {
    setIsModalOpen(true);
    fetchBookings();
  };

  const defaultImage =
    "https://via.placeholder.com/300x180?text=Event+Image";

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  const handleBooking = async (eventId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/book-event",
        {
          event_id: eventId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Event booked successfully 🎉");
      console.log("Booking response:", response.data);

    } catch (error) {
      console.error("Booking error:", error);

      if (error.response) {
        message.error(error.response.data.detail);
      } else {
        message.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <AppHeader />
      <div style={{ padding: "20px", textAlign: "center", marginTop:'10px' }}>
        <Button type="primary" onClick={openBookingsModal}>
          My Bookings
        </Button>
      </div>
<center>

      <Row
        className="container"
        gutter={[16, 16]}
        justify="center"
        align="middle"
        style={{ padding: "20px", minHeight: "100vh" }}
      >

        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          events.map((event) => {
            const locationName = event.location?.split(" - ")[0];
            const mapLink = event.location?.split(" - ")[1];

            return (
              <Col xs={24} sm={12} md={8} lg={6} key={event.id}>

                <Modal
                  title="My Bookings"
                  open={isModalOpen}
                  onCancel={() => setIsModalOpen(false)}
                  footer={null}
                  width={800}
                >
                  {bookingLoading ? (
                    <div style={{ textAlign: "center" }}>
                      <Spin />
                    </div>
                  ) : bookings.length === 0 ? (
                    <p>No bookings yet</p>
                  ) : (
                    <Row gutter={[16, 16]}>
                      {bookings.map((b) => {
                        const locationName = b.location?.split(" - ")[0];

                        return (
                          <Col span={12} key={b.booking_id}>
                            <Card>
                              <h3>{b.event_name}</h3>
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
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  )}
                </Modal>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="event"
                      src={event.image || EventImg}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  }
                  style={{ borderRadius: "10px" }}
                >
                  <Meta
                    title={event.name}
                    description={
                      <>
                        <p>
                          <EnvironmentOutlined /> {locationName}
                        </p>
                        <p>
                          <CalendarOutlined />{" "}
                          {new Date(event.event_time).toLocaleString()}
                        </p>
                      </>
                    }
                  />

                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Button
                      type="default"
                      href={mapLink}
                      target="_blank"
                      block
                    >
                      View Map
                    </Button>

                    <Button
                      type="primary"
                      block
                      onClick={() => handleBooking(event.id)}
                    >
                      Book
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
      </center>


      <AppFooter />
    </>

  );
}