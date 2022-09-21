import React, { useState, createContext } from "react";
import { UsernameContext } from "./UsernameProvider";

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      <UsernameContext.Provider value={{ username, setUsername }}>
        {children}
      </UsernameContext.Provider>
    </AuthenticatedUserContext.Provider>
  );
};
