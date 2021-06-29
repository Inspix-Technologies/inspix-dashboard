import {useState, useEffect} from "react";
import axios from "axios";

const useCameras = (userId) => {
  const [cameras, setCameras] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8002/owner/${userId}`)
      .then((res) => setCameras(res.data))
      .catch((e) => console.error(e));
  }, [userId]);

  return cameras;
};

export default useCameras;
