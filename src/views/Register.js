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
import {useFormik} from "formik";
import * as Yup from "yup";
import {useAppData} from "../providers/UserProvider";

export default function Login() {
  const app = useAppData();
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("this field cannot be empty")
      .email("please input a proper email"),
    password: Yup.string().required("this field cannot be empty"),
    passwordConfirm: Yup.string()
      .required("this field cannot be empty")
      .oneOf([Yup.ref("password")], "Password didn't match"),
  });

  const initialValues = {
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: ({email, password}, {setErrors}) => {
      app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((e) => {
          console.error(e);
          if (!e.code) return;
          switch (e.code) {
            case "auth/email-already-in-use":
              setErrors({email: "email already used by another account"});
              break;
            case "auth/weak-password":
              setErrors({password: "password should be at least 6 characters"});
              break;
            default:
              break;
          }
        });
    },
  });

  return (
    <div className="content">
      <Row className="justify-content-center">
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
                      <label>Email</label>
                      <Input
                        id="email"
                        name="email"
                        onChange={(e) => {
                          e.target.value = e.target.value.toLowerCase().trim();
                          formik.handleChange(e);
                        }}
                        invalid={formik.errors.email}
                        placeholder="Username"
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
