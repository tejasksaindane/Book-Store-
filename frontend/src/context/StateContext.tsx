import React, { createContext, useState, useEffect } from "react";
import { book_data } from "../interfaces/books";

export interface StepsProvider {
  children: React.ReactNode;
}

export const StepsContext = createContext({} as any);

export const StepsProvider = ({ children }: StepsProvider) => {
  const [isUser, setIsUser] = useState(false);
  const [booksData, setBooksData] = useState<book_data[] | []>([]);

  useEffect(() => {}, []);

  return (
    <StepsContext.Provider
      value={{ isUser, setIsUser, booksData, setBooksData }}
    >
      {children}
    </StepsContext.Provider>
  );
};
