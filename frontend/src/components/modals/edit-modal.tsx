import React, { useContext, useState } from "react";
import { customToast, validateEmail } from "../functions";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { book_data } from "../../interfaces/books";
import CreateUpdate from "../create-update";
import { MyContext } from "../../context/MyContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

const EditModal = ({
  data,
  showModal,
  closeModal,
}: {
  data: book_data;
  showModal: boolean;
  closeModal: (a: boolean) => void;
}) => {
  const { setBooks }: any = useContext(MyContext);
  const [formData, setFormData] = useState({
    id: data?._id ? data?._id : "",
    email: data?.email ? data.email : "",
    book_name: data?.title ? data.title : "",
    book_author: data?.author ? data.author : "",
    publish_year: data?.publishYear ? data.publishYear : "",
  });

  const handleChange = (e: any): void => {
    let key = e.target.id;
    let value = e.target.value;
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    if (validateEmail(formData.email)) {
      const updated_data = {
        title: formData.book_name,
        author: formData.book_author,
        publishYear: formData.publish_year,
        email: formData.email,
      };
      axios
        .put(`http://localhost:8000/books/${formData.id}`, updated_data)
        .then(() => {
          customToast("Book Details Updated sucssessfully");
          closeModal(false);
          axios.get("http://localhost:8000/books").then((response) => {
            setBooks(response.data.data);
          });
        });
    } else {
      customToast("Please enter a valid email");
    }
  };

  return (
    <Modal
      open={showModal}
      onClose={() => closeModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="relative transform overflow-hidden rounded-lg text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border">
            <div className="sm:flex sm:items-center">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <i className="bx bxs-edit"></i>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Edit book details
                </h3>
              </div>
            </div>
          </div>
          <CreateUpdate
            formData={formData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            closeModal={() => closeModal(false)}
            isEdit={true}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default EditModal;
