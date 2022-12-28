import { createContext, useState, useEffect } from "react";
import isAuthenticated from "../helpers/isAuthenticated";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [authData, setAuthData] = useState(-1); //not fetched yet = -1, not signed in = 0, authenticated = data object

  useEffect(() => {
    const getSession = async () => {
      let auth_data = await isAuthenticated();
      setAuthData(auth_data); //returns 0 if not authenticated
    };
    getSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
