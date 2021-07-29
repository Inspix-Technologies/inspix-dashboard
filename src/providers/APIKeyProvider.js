import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useUserToken } from "./UserProvider";

const APIKeyContext = React.createContext();

export default function APIKeyProvider({ children }) {
  const [apiKeys, setApiKeys] = useState([]);
  return (
    <APIKeyContext.Provider value={[apiKeys, setApiKeys]}>
      {children}
    </APIKeyContext.Provider>
  );
}

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useContext(APIKeyContext);
  const [isLoggedIn, userToken] = useUserToken();

  useEffect(() => {
    if (isLoggedIn === null || isLoggedIn === false) return;
    (async () => {
      try {
        const updatedKeys = await axios.get(
          `http://localhost:8000/apikey?uid=${userToken.uid}`
        ); //TODO: where to get the API keys by userUid
        console.log(updatedKeys);
        setApiKeys(updatedKeys.data);
      } catch (e) {
        if (e.response) return console.error(e);
        console.error(e);
      }
    })();
  }, []);

  return apiKeys;
};
