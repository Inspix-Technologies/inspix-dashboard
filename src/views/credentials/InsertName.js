import {Formik} from "formik";
import {
  useAppData,
  useUserData,
  useUserToken,
} from "../../providers/UserProvider";
import React, {useEffect} from "react";
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
import UserAPI from "../../libs/user-authentication/UserAPI";
import {useHistory, Redirect} from "react-router-dom";

export default function InsertName() {
  const [isLoggedIn, userToken] = useUserToken();
  const [_, setUserData] = useUserData();
  const history = useHistory();
  const app = useAppData();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field cannot be empty"),
  });
  //TODO: redirect if user data exists
  useEffect(() => {
    if (isLoggedIn === null) return console.log(1);
    if (isLoggedIn === false) return console.log(2);
    console.log(userToken);
  }, [isLoggedIn]);

  if (isLoggedIn === null) return <p>loading</p>;
  if (isLoggedIn === false) return <Redirect to="/admin/dashboard" />;

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
                onSubmit={({name}) => {
                  UserAPI.setUserName(name)
                    .then((res) => {
                      setUserData(res.data);
                      history.replace("/admin/dashboard");
                    })
                    .catch((e) => console.error(e));
                }}
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
                    <Button type="submit" color="success">
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
              <p className="m-0 mt-3">
                You are logged in as
                <strong>
                  <i> {userToken.email}</i>
                </strong>
              </p>
              <Button
                onClick={() => {
                  app.auth().signOut();
                  history.replace("/admin/dashboard");
                }}
                className="btn-link text-left p-0 m-0"
                color="danger"
              >
                Not you? Click here to Logout
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
