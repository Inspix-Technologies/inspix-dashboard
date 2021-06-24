import React, {createContext, useState, useContext, useEffect} from "react";
import axios from "axios";

const UserContext = createContext();

export default function UserProvider({children}) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const refreshToken = localStorage.getItem("rt");
    if (!refreshToken) return;
    axios
      .post("http://localhost:8001/api/token", {
        refreshToken: refreshToken,
      })
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserData = () => {
  const [userData, setUserData] = useContext(UserContext);
  return [userData, setUserData];
};
