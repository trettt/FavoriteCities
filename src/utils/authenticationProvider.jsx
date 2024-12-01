import { useState, useContext, createContext } from "react";

const AuthenticationContext = createContext();

export default function AuthenticationProvider({ children }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  return (
    <AuthenticationContext.Provider
      value={{ isUserAuthenticated, setIsUserAuthenticated }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthentication = () => useContext(AuthenticationContext);
