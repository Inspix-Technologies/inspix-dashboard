import React, {useState, useEffect} from "react";
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
import {Link, useHistory} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useUserToken} from "providers/UserProvider";
import {useAppData} from "providers/UserProvider";

export default function Login() {
  const [isLoggedIn] = useUserToken();
  const app = useAppData();

  const history = useHistory();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("this field cannot be empty")
      .email("please input a valid email"),
    password: Yup.string().required("this field cannot be empty"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (isLoggedIn === null) return;
    if (isLoggedIn === true) history.replace("/admin/dashboard");
  }, [isLoggedIn]);

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: ({email, password}, {setErrors}) => {
      app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((e) => {
          console.error(e);
        });
    },
  });

  return (
    <div className="content">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="p-3">
            <CardHeader>
              <h2 className="title">Login</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={formik.handleSubmit} autoComplete="off">
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Email</label>
                      <Input
                        id="email"
                        name="email"
                        onChange={(e) => {
                          e.target.value = e.target.value.toLowerCase().trim();
                          formik.handleChange(e);
                        }}
                        invalid={formik.errors.email}
                        placeholder="email"
                        type="text"
                        value={formik.values.email}
                      />
                      <p className="mt-n3 text-warning">
                        {formik.errors.email}
                      </p>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Password</label>
                      <Input
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        placeholder="Password"
                        type="password"
                        invalid={formik.errors.password}
                        value={formik.values.password}
                      />
                      <p className="mt-n3 text-warning">
                        {formik.errors.password}
                      </p>
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
                      Login
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <Link to="/admin/register">Create your account</Link>
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
