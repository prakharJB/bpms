import React, { useEffect } from "react";
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <>
      <div>
        <Container>
          <Header />
        </Container>
        <section>
          <div>
            <Container>
              <Row>
                <Col sm={12} md={5}>
                  <div>
                    <div>
                      <Link to="Signup">
                        <Button>SIGN UP</Button>
                      </Link>
                      <Link to="Login">
                        <Button>LOG IN</Button>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
        <Container>
          <Footer />
        </Container>
      </div>
    </>
  );
};
export default Home;
