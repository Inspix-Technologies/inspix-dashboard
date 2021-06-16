import React, {useRef, useState} from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Button,
  Input,
} from "reactstrap";

export default function PredictPhoto() {
  const uploadImageRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState();

  const handlePredictImage = (e) => {
    e.preventDefault();
    if (fileName === "") return;
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("hii");
      console.log(reader.result);
    };
    reader.readAsDataURL(uploadImageRef.current.files[0]);
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
                <Row>
                  <Col xs={12}>
                    <img src={imageUrl} />
                  </Col>
                </Row>
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
