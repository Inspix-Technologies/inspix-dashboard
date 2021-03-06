import React, { useRef, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Button,
  Input,
} from "reactstrap";
import NotificationAlert from "react-notification-alert";

import axios from "axios";
import { convertToBase64 } from "libs/base64/base64-preprocessor";
import drawBoundingBox from "libs/bounding-box/bbox-creator";
import SyntaxHighliter from "react-syntax-highlighter";
import a11y from "react-syntax-highlighter/dist/esm/styles/hljs/night-owl";
import { useUserToken } from "providers/UserProvider";
import { Redirect } from "react-router-dom";
import { useUserData } from "providers/UserProvider";
import baseAxios from "libs/main-api/MainAPI";

export default function PredictPhoto() {
  const uploadImageRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const notificationRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [apiReturn, setApiReturn] = useState("");
  const [apiRequest, setApiRequest] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoggedIn] = useUserToken();
  const [userData, setUserData] = useUserData();

  const handlePredictImage = (e) => {
    e.preventDefault();
    if (fileName === "" || !apiKey) return;
    const base64img = convertToBase64(imgRef);
    setApiRequest(
      JSON.stringify({ base64image: `${base64img.slice(0, 100)}...` }, null, 2)
    );
    setApiReturn("");
    baseAxios
      .post(
        `/predict`,
        {
          base64image: base64img,
        },
        {
          headers: { ["inspix-api-key"]: apiKey },
        }
      )
      .then((res) => {
        setApiReturn(res.data);
        drawBoundingBox(imgRef, canvasRef, res.data);
        setUserData({ ...userData, funds: userData.funds - 10 });
      })
      .catch((e) => {
        if (e.response) {
          console.error(e.response);
        } else {
          console.error(e);
        }
        notificationRef.current.notificationAlert({
          place: "br",
          type: "danger",
          autoDismiss: 7,
          message: (
            <div>
              <div>An error occured on sending API</div>
            </div>
          ),
        });
      });
  };

  if (isLoggedIn === null)
    return (
      <div className="content d-flex align-items-center justify-content-center">
        <p>loading</p>
      </div>
    );
  if (isLoggedIn === false) return <Redirect to="/admin/login" />;

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationRef} />
      </div>
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <h2 className="title">Predict Photo</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handlePredictImage}>
                <div
                  style={{
                    position: "relative",
                    top: 0,
                    left: 0,
                  }}
                >
                  <img
                    style={{
                      top: 0,
                      left: 0,
                    }}
                    ref={imgRef}
                    src={imageUrl}
                  ></img>
                  <canvas
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                    ref={canvasRef}
                  />
                </div>

                <Row>
                  <Col xs={12}>
                    <label>
                      {fileName === "" ? "please select an image" : fileName}
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Button
                      onClick={() => {
                        uploadImageRef.current.click();
                      }}
                      className="btn-fill"
                      color="primary"
                    >
                      Upload Image
                    </Button>
                    {fileName !== "" ? (
                      <Button
                        className="btn-fill"
                        color="success"
                        type="submit"
                      >
                        Predict Image
                      </Button>
                    ) : null}
                    <input
                      hidden
                      ref={uploadImageRef}
                      onChange={(e) => {
                        if (!e.target.files[0]) {
                          setImageUrl("");
                          setFileName("");
                          setApiRequest("");
                          setApiReturn("");
                          const ctx = canvasRef.current.getContext("2d");
                          ctx.clearRect(0, 0, 2000, 2000);
                          return;
                        }
                        const ctx = canvasRef.current.getContext("2d");
                        ctx.clearRect(0, 0, 2000, 2000);
                        setImageUrl(URL.createObjectURL(e.target.files[0]));
                        setFileName(e.target.value.replace(/.*[\/\\]/, ""));
                        setApiRequest("");
                        setApiReturn("");
                      }}
                      type="file"
                      accept="image/png, image/jpeg"
                    />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col xs={12}>
                    <h5>API Key</h5>
                    <div>
                      <Input
                        color="primary"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs={12}>
                    <h5>API Request</h5>
                    <div>
                      <SyntaxHighliter
                        wrapLines={true}
                        language="json"
                        style={a11y}
                      >
                        {apiRequest !== ""
                          ? apiRequest
                          : "please upload an image to see API request preview"}
                      </SyntaxHighliter>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs={12}>
                    <h5>API Response</h5>
                    <div
                      style={{
                        maxHeight: "20rem",
                        overflowY: "auto",
                      }}
                    >
                      <SyntaxHighliter language="json" style={a11y}>
                        {apiReturn !== ""
                          ? JSON.stringify(apiReturn, null, 2)
                          : "please upload an image to see API return preview"}
                      </SyntaxHighliter>
                    </div>
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
