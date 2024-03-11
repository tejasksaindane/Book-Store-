import axios from "axios";
import {
  book_data,
  bool_state,
  param_interface,
  user_data,
} from "../interfaces/books";
import DeleteModal from "./modals/delete-modal";
import { toast } from "react-toastify";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import EditModal from "./modals/edit-modal";

export const customToast = (message: string) => {
  return toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export function EditButtonRenderer(
  selected: book_data,
  setSelected: (a: book_data) => void,
  params: param_interface,
  edOpen: boolean,
  setEdOpen: bool_state
) {
  const handleEditClick = () => {
    setEdOpen(!edOpen);
    setSelected(params.node.data);
  };

  return (
    <>
      <button
        style={{ width: 80 }}
        onClick={handleEditClick}
        className="bg-blue-500 hover:bg-blue-700 text-white text-sm uppercase py-2 font-semibold rounded shadow"
      >
        Edit
      </button>
      {edOpen && (
        <EditModal data={selected} showModal={edOpen} closeModal={setEdOpen} />
      )}
    </>
  );
}

export function DeleteButtonRenderer(
  selected: book_data,
  setSelected: (a: book_data) => void,
  params: param_interface,
  deOpen: boolean,
  setDeOpen: bool_state
) {
  const { setBooks }: any = useContext(MyContext);
  const handleBookDelete = () => {
    axios.delete(`http://localhost:8000/books/${selected._id}`).then(() => {
      setDeOpen(false);
      customToast("Book Deleted Successfully");
      axios.get("http://localhost:8000/books").then((response) => {
        setBooks(response.data.data);
      });
    });
  };

  const handleDeleteClick = () => {
    setDeOpen(!deOpen);
    setSelected(params.node.data);
  };

  return (
    <>
      <button
        style={{ width: 80 }}
        onClick={handleDeleteClick}
        className="bg-red-500 hover:bg-red-600 text-sm uppercase  text-white py-2 font-semibold rounded shadow"
      >
        Delete
      </button>
      {deOpen && (
        <DeleteModal
          name={selected?.title}
          showModal={deOpen}
          closeModal={setDeOpen}
          handleBookDelete={handleBookDelete}
        />
      )}
    </>
  );
}

export const saveUserToDb = (data: user_data) => {
  console.log("saveUserToDb :", data);
  axios.post("http://localhost:8000/users", data).then(() => {
    console.log("User data stored into Db");
  });
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
