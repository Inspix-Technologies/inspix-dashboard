import React, {useRef} from "react";
import {Container, Input, FormGroup, Button, Form} from "reactstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import NotificationAlert from "react-notification-alert";

export default function ComingSoon() {
  const notificationRef = useRef(null);

  const schema = Yup.object().shape({
    email: Yup.string().email("please input a proper email").required(""),
  });

  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: ({email}, {setErrors, setValues}) => {
      axios
        .post("http://localhost:8001/api/users/subscribe", {email: email})
        .then((res) => {
          if (res.status === 201) {
            setValues({email: ""});
            notificationRef.current.notificationAlert({
              place: "br",
              type: "success",
              autoDismiss: 7,
              message: (
                <div>
                  <div>Email subscribed successfully</div>
                </div>
              ),
            });
          }
        })
        .catch((e) => {
          if (!e.response) return;
          setErrors({email: e.response.data.message});
        });
    },
  });

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationRef} />
      </div>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center flex-column"
        style={{
          height: "60vh",
        }}
      >
        <h2
          className="title align-center"
          style={{
            marginBottom: "0.4rem",
          }}
        >
          Coming Soon
        </h2>
        <p className="d-block text-center">
          We will email you when it's ready 😄
        </p>
        <Form onSubmit={formik.handleSubmit} autoComplete="off">
          <FormGroup
            style={{
              minWidth: "20rem",
            }}
          >
            <Input
              className="mt-2"
              placeholder="example@email.com"
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              invalid={formik.errors.email}
              value={formik.values.email}
            />
            <p className="mt-1 text-warning">{formik.errors.email}</p>
            <Button className="w-100 mt-2" type="submit" color="success">
              Subscribe
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}
