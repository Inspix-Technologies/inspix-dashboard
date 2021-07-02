import axios from "axios";
import {useEffect, useState} from "react";

const useAnalyticData = (cctvIds) => {
  const [analytics, setAnalytics] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8003/count", {
        params: {
          id: cctvIds,
        },
      })
      .then((res) => {
        console.log(res);
        setAnalytics(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return analytics;
};

export default useAnalyticData;
