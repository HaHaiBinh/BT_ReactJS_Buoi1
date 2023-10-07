import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header(props) {
  return (
    <header className="header">
      <Container>
        <Row className="justify-content-between">
          {/* <Col xs="auto">
            <a
              className="header__link header__title"
              href="https://www.youtube.com/@EasyFrontend"
              target="_blank"
              rel="noopener noreferrer"
            >
              Easy Frontend
            </a>
          </Col> */}
          <Col xs="auto">
            <NavLink
              exact
              className="header__link"
              to="/photos"
              activeClassName="header__link--active"
            >
              Easy Frontend
            </NavLink>
          </Col>
          <Col xs="auto">
            <NavLink
              exact
              className="header__link"
              to="/sign-in"
              activeClassName="header__link--active"
            >
              Sign In
            </NavLink>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

Header.propTypes = {};

export default Header;
