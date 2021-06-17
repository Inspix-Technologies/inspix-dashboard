import React, {useRef, useState} from "react";
import {Row, Col, Card, CardHeader, CardBody, Form, Button} from "reactstrap";

import axios from "axios";

export default function PredictPhoto() {
  const uploadImageRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState();

  // const preprocessBoundingBox = (bbox, imgRef) => {
  //   const minY = bbox[0] * imgRef.current.offsetHeight;
  //   const minX = bbox[1] * imgRef.current.offsetWidth;
  //   const maxY = bbox[2] * imgRef.current.offsetHeight;
  //   const maxX = bbox[3] * imgRef.current.offsetWidth;
  //   console.log({
  //     1: [minY, minX, maxY, maxX],
  //     2: bbox,
  //   });
  //   return {
  //     x: minX,
  //     y: minY,
  //     width: maxX - minX,
  //     height: maxY - minY,
  //   };
  // };

  const preprocessBoundingBox = ([ymin, xmin, ymax, xmax]) => {
    const width = xmax - xmin;
    const height = ymax - ymin;
    const x = xmin;
    const y = ymin;
    console.log(ymin, xmin, ymax, xmax);
    return {width, height, x, y};
  };

  const drawBoundingBox = (imgRef, canvasRef, predictions) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 2000, 2000);

    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    canvasRef.current.width = imgRef.current.width * 1.1;
    canvasRef.current.height = imgRef.current.height * 1.1;
    predictions.map((detection) => {
      const {xmin, ymin, xmax, ymax} = detection;

      const {x, y, width, height} = preprocessBoundingBox(
        [ymin, xmin, ymax, xmax],
        imgRef
      );

      const color = "#eee";
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);

      ctx.fillStyle = color;
      const textWidth = ctx.measureText(
        detection["name"] +
          " " +
          (100 * detection["confidence"]).toFixed(2) +
          "%"
      ).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
      ctx.fillStyle = "#000000";
      ctx.fillText(
        detection["name"] +
          " " +
          (100 * detection["confidence"]).toFixed(2) +
          "%",
        x,
        y + 10
      );
    });
  };

  const handlePredictImage = (e) => {
    e.preventDefault();
    if (fileName === "") return;
    const canvas = document.createElement("canvas");
    canvas.width = imgRef.current.width;
    canvas.height = imgRef.current.height;
    canvas.getContext("2d").drawImage(imgRef.current, 0, 0);
    const data = canvas.toDataURL("image/png");
    console.log(data);
    axios
      .post("http://localhost:8001/inspix-models/test", {
        base64image: data,
      })
      .then((res) => {
        console.log(res);
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
