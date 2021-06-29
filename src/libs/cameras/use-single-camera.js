import {useState, useEffect} from "react";
import axios from "axios";

const useSingleCamera = (cameraId) => {
  const [camera, setCameras] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:8002/cctv/${cameraId}`)
      .then((res) => setCameras(res.data))
      .catch((e) => console.error(e));
  }, [cameraId]);

  return camera;
};

export default useSingleCamera;
