//TODO: refactor!
import React from "react";
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
import {Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useUserData} from "providers/UserProvider";
import {useHistory} from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("this field is required"),
  source: Yup.string().required("this field is required"),
  height: Yup.number().required("this field is required"),
  width: Yup.number().required("this field is required"),
});

export default function NewCamera() {
  const [userData, _] = useUserData();
  const history = useHistory();

  if (!userData.id) return <p>please login</p>;

  return (
    <div className="content">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <h2 className="title">Setup New Camera</h2>
            </CardHeader>
            <CardBody>
              <Formik
                initialValues={{
                  name: "",
                  source: "",
                  height: 0,
                  width: 0,
                }}
                validationSchema={validationSchema}
                onSubmit={({name, source, height, width}, {setErrors}) => {
                  const payload = {
                    name,
                    ownerId: userData.id,
                    source,
                    height,
                    width,
                  };
                  console.log(payload);
                  axios
                    .post("http://localhost:8002", {
                      name,
                      ownerId: userData.id,
                      source,
                      height,
                      width,
                    })
                    .then((res) => {
                      history.push("/admin/manage/cameras");
                    })
                    .catch((e) => {
                      if (!e.response) return;
                      console.error(e.response);
                    });
                }}
              >
                {(props) => (
                  <Form onSubmit={props.handleSubmit} autoComplete="off">
                    <Row>
                      <Col xs={6}>
                        <FormGroup>
                          <label>Camera Name</label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
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
                    <Row>
                      <Col xs={6}>
                        <FormGroup>
                          <label>Source</label>
                          <Input
                            id="source"
                            name="source"
                            type="text"
                            onChange={props.handleChange}
                            value={props.values.source}
                            invalid={props.errors.source}
                          />
                          <p className="mt-n3 text-warning">
                            {props.errors.source}
                          </p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <FormGroup>
                          <label>Height</label>
                          <Input
                            id="height"
                            name="height"
                            type="number"
                            onChange={props.handleChange}
                            value={props.values.height}
                            invalid={props.errors.height}
                          />
                          <p className="mt-n3 text-warning">
                            {props.errors.height}
                          </p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <FormGroup>
                          <label>Width</label>
                          <Input
                            id="width"
                            name="width"
                            type="number"
                            onChange={props.handleChange}
                            value={props.values.width}
                            invalid={props.errors.width}
                          />
                          <p className="mt-n3 text-warning">
                            {props.errors.width}
                          </p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          className="btn-fill mt-2"
                          color="primary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
