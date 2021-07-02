import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ReactHlsPlayer from "react-hls-player";
import {Row, Col, Card, CardHeader, CardBody, CardTitle} from "reactstrap";
import useSingleCamera from "libs/cameras/use-single-camera";

export default function WatchCamera() {
  const [numId, setNumId] = useState(0);
  const {id} = useParams();
  const camera = useSingleCamera(id);

  useEffect(() => {
    const parseId = parseInt(id);
    if (isNaN(parseId)) return setNumId(-1);
    setNumId(parseId);
  }, [id]);

  return (
    <div className="content">
      {numId === -1 ? (
        <p>invalid route parameter</p>
      ) : (
        <Row>
          <Col xs={12}>
            <Card>
              {camera === null ? (
                <p>unknown camera</p>
              ) : (
                <>
                  <CardHeader>
                    <h2 className="title mb-0">{camera.name}</h2>
                    <p className="font-italic">{camera.source}</p>
                  </CardHeader>
                  <CardBody>
                    <ReactHlsPlayer
                      src={camera.source}
                      autoPlay={true}
                      controls={false}
                      width={camera.width}
                      height={camera.height}
                    />
                  </CardBody>
                </>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
