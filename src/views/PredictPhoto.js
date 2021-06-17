import React, {useRef, useState} from "react";
import {Row, Col, Card, CardHeader, CardBody, Form, Button} from "reactstrap";

import axios from "axios";
import {convertToBase64} from "libs/base64/base64-preprocessor";
import drawBoundingBox from "libs/bounding-box/bbox-creator";

export default function PredictPhoto() {
  const uploadImageRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState();

  const handlePredictImage = (e) => {
    e.preventDefault();
    if (fileName === "") return;
    const base64img = convertToBase64(imgRef);
    axios
      .post("http://localhost:8001/inspix-models/test", {
        base64image: base64img,
      })
      .then((res) => {
        drawBoundingBox(imgRef, canvasRef, res.data);
      })
      .catch((e) => {
        console.error(e.response);
      });
  };

  return (
    <div className="content">
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
                    // height="1200"
                    // width="1200"
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
                          const ctx = canvasRef.current.getContext("2d");
                          ctx.clearRect(0, 0, 2000, 2000);
                          return;
                        }
                        setImageUrl(URL.createObjectURL(e.target.files[0]));
                        setFileName(e.target.value.replace(/.*[\/\\]/, ""));
                      }}
                      type="file"
                      accept="image/png, image/jpeg"
                    />
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
