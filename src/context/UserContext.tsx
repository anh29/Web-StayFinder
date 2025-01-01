import React, { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "types/user";

interface UserContextProps {
  user: User | null;
  loggedIn: boolean;
  setUser: (user: User) => void;
  setLoggedIn: (status: boolean) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  loggedIn: false,
  setUser: () => {},
  setLoggedIn: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    const savedLoggedIn = localStorage.getItem("loggedIn");
    return savedLoggedIn ? JSON.parse(savedLoggedIn) : false;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  return (
    <UserContext.Provider value={{ user, loggedIn, setUser, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
