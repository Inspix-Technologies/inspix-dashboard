import {Formik} from "formik";
import {useUserToken} from "../../providers/UserProvider";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  FormGroup,
  Button,
} from "reactstrap";

export default function InsertName() {
  const [isLoggedIn, userToken] = useUserToken();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field cannot be empty"),
  });

  useEffect(() => {
    if (isLoggedIn === null) return console.log(1);
    if (isLoggedIn === false) return console.log(2);
    console.log(userToken);
  }, [isLoggedIn]);

  if (isLoggedIn === null) return <p>loading</p>;

  return (
    <div className="content overflow-hidden">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="p-3">
            <CardHeader>
              <h2 className="title">Welcome to INSPIX!</h2>
            </CardHeader>
            <CardBody>
              <Formik
                initialValues={{name: ""}}
                validationSchema={validationSchema}
              >
                {(props) => (
                  <Form onSubmit={props.handleSubmit}>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label>Name</label>
                          <Input
                            id="name"
                            name="name"
                            onChange={props.handleChange}
                            value={props.values.name}
                            invalid={props.errors.name}
                          />
                          <p className="mt-n3 text-warning">
                            {props.errors.name}
                          </p>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
              <Button color="success">Submit</Button>
              <p className="m-0 mt-3">
                You are logged in as
                <strong>
                  <i> {userToken.email}</i>
                </strong>
              </p>
              <Button className="btn-link text-left p-0 m-0" color="danger">
                Not you? Click here to Logout
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
