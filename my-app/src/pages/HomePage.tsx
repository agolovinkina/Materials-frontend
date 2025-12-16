// HomePage.tsx
import type { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { Container, Row, Col } from "react-bootstrap";
import './HomePage.css';

export const HomePage: FC = () => {
  return (
    <div className="home-container">
      {/* Background elements */}
      <div className="home-background"></div>
      <div className="home-overlay"></div>
      
      <Container fluid className="home-content">
        <div className="content-wrapper">
          {/* Main Title */}
          <Row>
            <Col>
              <h1 className="main-title">Радиоуглеродное датирование</h1>
            </Col>
          </Row>

          {/* Materials Section */}
          <Row>
            <Col>
              <div className="materials-section">
                <div className="section-title">Анализируйте подходящие образцы</div>
              </div>
            </Col>
          </Row>

          {/* CTA Button */}
          <Row>
            <Col>
              <div className="button-container">
                <Link to={ROUTES.MATERIALS} className="cta-button">
                  Начать анализ
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};