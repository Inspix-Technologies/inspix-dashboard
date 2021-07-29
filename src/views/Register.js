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
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppData } from "../providers/UserProvider";
import UserAPI from "libs/user-authentication/UserAPI";

export default function Login() {
  const app = useAppData();
  const history = useHistory();
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("this field cannot be empty")
      .email("please input a proper email"),
    name: Yup.string().required("this field cannot be empty"),
    phoneNumber: Yup.string().required("this field cannot be empty"),
    businessName: Yup.string().required("this field cannot be empty"),
    businessType: Yup.string().required("this field cannot be empty"),
    password: Yup.string().required("this field cannot be empty"),
    passwordConfirm: Yup.string()
      .required("this field cannot be empty")
      .oneOf([Yup.ref("password")], "Password didn't match"),
  });

  const initialValues = {
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phoneNumber: "",
    businessName: "",
    businessType: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: ({ email, password, ...rest }, { setErrors }) => {
      app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user.updateProfile({
            displayName: rest.name,
          });
          res.user.getIdToken().then((token) => {
            UserAPI.setUserData(rest, token);
          });
          history.replace("/");
        })
        .catch((e) => {
          console.error(e);
          if (!e.code) return;
          switch (e.code) {
            case "auth/email-already-in-use":
              setErrors({ email: "email already used by another account" });
              break;
            case "auth/weak-password":
              setErrors({
                password: "password should be at least 6 characters",
              });
              break;
            default:
              break;
          }
        });
    },
  });

  return (
    <div
      className="content"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflowX: "hidden",
      }}
    >
      <Row
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="p-3">
            <CardHeader>
              <h2 className="title">Register</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={formik.handleSubmit} autoComplete="off">
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Name</label>
                      <Input
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        invalid={formik.errors.name}
                        placeholder="Name"
                        type="text"
                        value={formik.values.name}
                      />
                      <p className="mt-n3 text-warning">{formik.errors.name}</p>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Phone Number</label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={formik.handleChange}
                        invalid={formik.errors.phoneNumber}
                        placeholder="Phone Number"
                        type="text"
                        value={formik.values.phoneNumber}
                      />
                      <p className="mt-n3 text-warning">
                        {formik.errors.phoneNumber}
                      </p>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Business Name</label>
                      <Input
                        id="businessName"
                        name="businessName"
                        onChange={formik.handleChange}
                        invalid={formik.errors.businessName}
                        placeholder="Name"
                        type="text"
                        value={formik.values.businessName}
                      />
                      <p className="mt-n3 text-warning">
                        {formik.errors.businessName}
                      </p>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Business Industry</label>
                      <Input
                        id="businessType"
                        name="businessType"
                        type="select"
                        onChange={formik.handleChange}
                      >
                        <option>Technology / Startup</option>
                        <option>Government</option>
                        <option>Goods & Services</option>
                        <option>Tourism</option>
                        <option>Cullinary</option>
                        <option>Academic Institute</option>
                        <option>Others</option>
                      </Input>
                      <p className="mt-n3 text-warning">
                        {formik.errors.businessType}
                      </p>
                    </FormGroup>
                  </Col>
                </Row>
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
                        placeholder="example@domain.com"
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
                    <FormGroup>
                      <label>Confirm Password</label>
                      <Input
                        id="passwordConfirm"
                        name="passwordConfirm"
                        onChange={formik.handleChange}
                        placeholder="Confirm Password"
                        type="password"
                        invalid={formik.errors.passwordConfirm}
                        value={formik.values.passwordConfirm}
                      />
                      <p className="mt-n3 text-warning">
                        {formik.errors.passwordConfirm}
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
                      Register
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <Link to="/login">Already have an account</Link>
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
