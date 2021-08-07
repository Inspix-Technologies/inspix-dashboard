import baseAxios from "libs/main-api/MainAPI";
import { useUserData } from "providers/UserProvider";
import { useUserToken } from "providers/UserProvider";
import React from "react";
import { Redirect } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Button,
} from "reactstrap";

export default function Funds(props) {
  const [isLoggedIn, userToken] = useUserToken();
  const [userData] = useUserData();

  if (isLoggedIn === null) return <p>loading</p>;
  if (isLoggedIn === false) return <Redirect to="/admin/dashboard" />;

  const sendTopupRequest = (productId) => async () => {
    const token = await userToken.getIdToken();
    try {
      const response = await baseAxios.post(
        `/billing/request`,
        {
          productId: productId,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      window.location.href = response.data.redirect_url;
    } catch (e) {
      if (e.response) return console.error(e.response);
      console.error(e);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <h2 className="title">Funds</h2>
            </CardHeader>
            <CardBody>
              <h3>Rp. {userData.funds}</h3>
              <Row className="mx-5">
                <Col xs={4}>
                  <Card>
                    <CardBody
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onClick={sendTopupRequest(0)}
                    >
                      <CardText>Rp.50.000</CardText>
                      <Button color="primary">Top Up</Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs={4}>
                  <Card>
                    <CardBody
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onClick={sendTopupRequest(1)}
                    >
                      <CardText>Rp.100.000</CardText>
                      <Button color="primary">Top Up</Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs={4}>
                  <Card>
                    <CardBody
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onClick={sendTopupRequest(2)}
                    >
                      <CardText>Rp.150.000</CardText>
                      <Button color="primary">Top Up</Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
