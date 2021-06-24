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
import {useUserData} from "providers/UserProvider";

export default function Login() {
  const [userData, setUserData] = useUserData();

  const history = useHistory();

  const schema = Yup.object().shape({
    username: Yup.string().required("this field cannot be empty"),
    password: Yup.string().required("this field cannot be empty"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  useEffect(() => {
    console.log("hello");
    console.log(userData);
  }, [userData]);

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: ({username, password}, {setErrors}) => {
      axios
        .post("http://localhost:8001/api/users/login", {
          username,
          password,
        })
        .then((e) => {
          localStorage.setItem("rt", e.data.refreshToken);
          setUserData(e.data.user);
          history.replace("/admin/detect/mask");
        })
        .catch((e) => {
          if (!e.response) return;
          console.error(e.response);
          const errors = e.response.data.reduce(
            (prev, curr) => ({...prev, [curr.path]: curr.message}),
            [{}]
          );
          setErrors(errors);
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
                      <label>Username</label>
                      <Input
                        id="username"
                        name="username"
                        onChange={(e) => {
                          e.target.value = e.target.value.toLowerCase().trim();
                          console.log(formik.errors);
                          formik.handleChange(e);
                        }}
                        invalid={formik.errors.username}
                        placeholder="Username"
                        type="text"
                        value={formik.values.username}
                      />
                      <p className="mt-n3 text-warning">
                        {formik.errors.username}
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
