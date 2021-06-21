import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import {Link} from "react-router-dom";

export default function Login() {
  return (
    <div className="content">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="p-3">
            <CardHeader>
              <h2 className="title">Register</h2>
            </CardHeader>
            <CardBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Name</label>
                      <Input placeholder="Name" type="text" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Username</label>
                      <Input placeholder="Username" type="text" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Password</label>
                      <Input placeholder="Password" type="password" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      className="btn-fill w-100"
                      color="primary"
                      type="submit"
                    >
                      Register
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <Link to="/admin/login">Already have an account</Link>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
