import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
import Link from "next/link";

export default function Navigation() {
  return (
    <>
      <StyledNavbar
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        collapseOnSelect
        expand="lg"
      >
        <Container>
          <Navbar.Brand>
            <a className="logo-image" href="index.html">
              <img src="images/logo.svg" alt="alternative" />
            </a>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link>
                <Link
                  className="nav-link page-scroll"
                  href="#header"
                  as="button"
                >
                  HOME
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  className="nav-link page-scroll"
                  href="#features"
                  as="button"
                >
                  FEATURES
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  className="nav-link page-scroll"
                  href="#details"
                  as="button"
                >
                  DETAILS
                </Link>
              </Nav.Link>

              <Nav.Link>
                <Link
                  className="nav-link page-scroll"
                  href="#pricing"
                  as="button"
                >
                  PRICING
                </Link>
              </Nav.Link>
            </Nav>
            <Link className="btn-outline-sm" href="log-in.html" as="button">
              LOG IN
            </Link>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
    </>
  );
}

const StyledNavbar = styled(Navbar)`
  background-color: #5f4dee;
  font: 700 0.875rem/0.875rem "Open Sans", sans-serif;
  transition: all 0.2s;

  .navbar-brand.logo-image img {
    width: 4.4375rem;
    height: 1.75rem;
  }

  .navbar-brand.logo-text {
    font: 700 2rem/1.5rem "Open Sans", sans-serif;
    color: #fff;
    text-decoration: none;
  }

  .navbar-nav {
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .nav-link {
    padding: 0.625rem 0.75rem 0.625rem 0.75rem;
    color: #f7f5f5;
    opacity: 0.8;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .nav-link:hover,
  .nav-link.active {
    color: #fff;
    opacity: 1;
  }

  .btn-outline-sm {
    min-width: 100px !important;
    text-align: center;
    padding: 0.25rem 1rem;
    border: 0.125rem solid #fff;
    border-radius: 2rem;
    color: #fff;
    background: #5f4dee;
    text-decoration: none;
    transition: all 0.2s;
    margin-left: 1.5rem;
  }

  .btn-outline-sm:hover {
    background-color: #fff;
    color: #5f4dee;
  }
`;
