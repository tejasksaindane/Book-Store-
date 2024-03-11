import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./components";
import CreateBook from "./components/create-book";
import { MyContext } from "./context/MyContext.tsx";
import { useEffect, useState } from "react";
import { book_interface } from "./interfaces/books.tsx";
import Login from "./components/login.tsx";
import SignUp from "./components/sign-up.tsx";
import NotFound from "./components/NotFound.tsx";

function App() {
  const isUser = sessionStorage.getItem("isValidUser");
  const [books, setBooks] = useState<book_interface[]>([]);
  const [validUser, setValidUser] = useState<boolean>(false);

  useEffect(() => {}, [validUser]);
  return (
    <BrowserRouter>
      <MyContext.Provider value={{ books, setBooks, setValidUser } as any}>
        <Routes>
          {isUser ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/books/create" element={<CreateBook />} />
            </>
          ) : (
            <>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/" element={<Login />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
