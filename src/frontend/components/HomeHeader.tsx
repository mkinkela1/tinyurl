import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function HomeHeader() {
  return (
    <StyledHeader>
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={8} xs sm md>
            <InputGroup className="mb-3">
              <Form.Control
                autoFocus={false}
                placeholder="Paste url here"
                aria-label="Paste url here"
                aria-describedby="basic-addon2"
                size="lg"
                style={{ borderRadius: "2rem 0 0 2rem", paddingLeft: "2rem" }}
              />
              <StyledButton>Short it!</StyledButton>
            </InputGroup>
          </Col>
          {/*<div className="col-lg-6 col-xl-5">*/}
          {/*  <div className="text-container">*/}
          {/*    <h1>SaaS App HTML Landing Page</h1>*/}
          {/*    <p className="p-large">*/}
          {/*      Use Tivo to automate your marketing actions in order to reach*/}
          {/*      a much larger audience*/}
          {/*    </p>*/}
          {/*    <a className="btn-solid-lg page-scroll" href="sign-up.html">*/}
          {/*      SIGN UP*/}
          {/*    </a>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="col-lg-6 col-xl-7">*/}
          {/*  <div className="image-container">*/}
          {/*    <div className="img-wrapper">*/}
          {/*      <Image*/}
          {/*        width={500}*/}
          {/*        height={500}*/}
          {/*        className="img-fluid"*/}
          {/*        src="/home-img.png"*/}
          {/*        alt="alternative"*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </Row>
      </Container>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  background-color: #5f4dee;

  padding-top: 8rem;
  padding-bottom: 4rem;
  text-align: center;

  .text-container {
    margin-bottom: 3rem;
  }

  h1 {
    margin-bottom: 1rem;
    color: #fff;
    font-size: 2.5rem;
    line-height: 3rem;
  }

  .p-large {
    margin-bottom: 2rem;
    color: #f3f7fd;
  }
`;

const StyledButton = styled(Button)`
  min-width: 100px !important;
  text-align: center;
  padding: 0.25rem 1rem;
  border: 0.125rem solid #fff;
  border-radius: 2rem;
  color: #fff;
  background: #5f4dee;
  text-decoration: none;
  transition: all 0.5s;
  margin-left: 1.5rem;

  &:hover {
    background: #fff !important;
    color: #5f4dee !important;
    border: #fff !important;
  }
`;
