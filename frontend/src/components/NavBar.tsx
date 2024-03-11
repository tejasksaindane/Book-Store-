import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

const NavBar = () => {
  const { setValidUser }: any = useContext(MyContext);

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        sessionStorage.removeItem("isValidUser");
        setValidUser(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <i
                  className="bx bxs-book-open text-sky-100"
                  style={{ fontSize: 35 }}
                ></i>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Dashboard
                  </button>
                </Link>
                <Link
                  to="/books/create"
                  className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  <button className="bg-transparent hover:bg-blue-500  font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    New book
                  </button>
                </Link>
                <Button style={{ color: "#fff" }} onClick={handleLogOut}>
                  logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/"
            className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            aria-current="page"
          >
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              Dashboard
            </button>
          </Link>
          <Link
            to="/books/create"
            className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            <button className="bg-transparent hover:bg-blue-500  font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              New book
            </button>
          </Link>
          <Button onClick={handleLogOut}>Primary</Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
