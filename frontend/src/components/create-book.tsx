import axios from "axios";
import { useState } from "react";
import { customToast, validateEmail } from "./functions";
import { ToastContainer } from "react-toastify";
import CreateUpdate from "./create-update";
import NavBar from "./NavBar";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    email: "",
    book_name: "",
    book_author: "",
    publish_year: "",
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
      const data = {
        title: formData.book_name,
        author: formData.book_author,
        publishYear: formData.publish_year,
        email: formData.email,
      };
      axios.post("http://localhost:8000/books", data).then(() => {
        setFormData({
          email: "",
          book_name: "",
          book_author: "",
          publish_year: "",
        });
        customToast("Book added sucssessfully");
      });
    } else {
      customToast("Please enter a valid email");
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-form mt-20">
        <div className="w-full max-w-sm">
          <CreateUpdate
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreateBook;
