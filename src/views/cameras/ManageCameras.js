import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";
import {Link} from "react-router-dom";
import useCameras from "libs/cameras/use-cameras";
import {useUserData} from "providers/UserProvider";

export default function ManageCameras() {
  const [userData, _] = useUserData();

  const cameras = useCameras(userData.id);

  return (
    <div className="content">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <h2 className="title">Manage Cameras</h2>
            </CardHeader>
            <CardBody>
              <Row className="mx-5">
                {cameras.length < 1 ? (
                  <p>no cameras</p>
                ) : (
                  cameras.map((camera, i) => (
                    <Col xs={4}>
                      <Link to={`/admin/cameras/${camera.id}`}>
                        <Card key={i}>
                          <CardImg
                            top
                            height={200}
                            style={{objectFit: "cover"}}
                            src={`${process.env.PUBLIC_URL}/assets/inspix-new-01.jpg`}
                          />
                          <CardBody>
                            <CardTitle>{camera.name}</CardTitle>
                            <CardText className="font-italic">
                              {camera.source}
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </Col>
                  ))
                )}
              </Row>
              <Link to="/admin/manage/cameras/new">
                <Button className="btn-fill mt-2" color="primary" type="submit">
                  New Camera
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
