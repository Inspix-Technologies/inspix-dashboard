import React, { createContext, useState, useContext, useEffect } from "react";
import firebase from "firebase";
import UserAPI from "../libs/user-authentication/UserAPI";
import { useHistory } from "react-router-dom";

const UserContext = createContext();
const AppContext = createContext();
const UserTokenContext = createContext();

var firebaseConfig = {
  apiKey: "AIzaSyCa0NQQiUq2CvqtQE0xvSSPSbZ2F4zG3Ss",
  authDomain: "inspix-technologies.firebaseapp.com",
  projectId: "inspix-technologies",
  storageBucket: "inspix-technologies.appspot.com",
  messagingSenderId: "996704070792",
  appId: "1:996704070792:web:085f6c53dc0976b9bfc33d",
  measurementId: "G-H8ZYB943NK",
};

export default function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState({});
  const [app, setApp] = useState(null);
  const [userToken, setUserToken] = useState({});

  useEffect(() => {
    setApp(firebase.initializeApp(firebaseConfig));
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setTimeout(async () => {
          const idToken = await user.getIdToken();
          setUserToken(user);
          console.log(idToken);
          try {
            const userData = await UserAPI.getUserData(idToken);
            if (userData.status === 403) throw userData;
            setUserData(userData.data);
          } catch (e) {
            const code = e.data.code;
            console.error(e.response);
            if (!code) return console.error(e.response);
          }
          setIsLoggedIn(true);
          return;
        }, 500);
      } else {
        console.log("logged out");
        setIsLoggedIn(false);
        setUserData({});
        setUserToken({});
      }
    });
  }, []);

  return (
    <UserTokenContext.Provider value={[isLoggedIn, userToken]}>
      <UserContext.Provider value={[userData, setUserData]}>
        <AppContext.Provider value={app}>{children}</AppContext.Provider>
      </UserContext.Provider>
    </UserTokenContext.Provider>
  );
}

export const useUserData = () => {
  const [userData, setUserData] = useContext(UserContext);
  return [userData, setUserData];
};

export const useAppData = () => {
  const appData = useContext(AppContext);
  return appData;
};

export const useUserToken = () => {
  const [isLoggedIn, userToken] = useContext(UserTokenContext);
  return [isLoggedIn, userToken];
};
