import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [initialAuthMethod, setInitialAuthMethod] = useState("login");
  const [isTeacherAuth, setIsTeacherAuth] = useState(
    localStorage.getItem("userAuth")
  );
  const [loggedin, setLoggedin] = useState(null);
  const [token, setTheToken] = useState(localStorage.getItem("token"));
  const [userId, setTheUserId] = useState(localStorage.getItem("userId"));

  const authContext = {
    userId: userId,
    setUserId: (value) => setTheUserId(value),
    token: token,
    setToken: (value) => setTheToken(value),
    userAuth: isTeacherAuth,
    authMethod: initialAuthMethod,
    isLoggedin: loggedin,
    setAuthMethod: (value) => setInitialAuthMethod(value),
    setUserAuth: (value) => setIsTeacherAuth(value),
    setIsLoggedin: (value) => setLoggedin(value),
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
