import React from "react";

const CreateUpdate = ({
  formData,
  handleSubmit,
  handleChange,
  isEdit = false,
  closeModal,
}: {
  formData: { [key: string]: string | number };
  handleSubmit: (e: React.SyntheticEvent) => void;
  handleChange: (e: any) => void;
  isEdit?: boolean;
  closeModal?: (a: boolean) => void;
}) => {
  return (
    <div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {!isEdit && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Book name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="book_name"
            type="text"
            placeholder="Book name"
            onChange={handleChange}
            value={formData.book_name}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Book author
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="book_author"
            type="text"
            placeholder="Book author"
            onChange={handleChange}
            value={formData.book_author}
            required
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Publish Year
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="publish_year"
            type="text"
            placeholder="Publish year"
            onChange={handleChange}
            value={formData.publish_year}
            required
          />
        </div>

        <div
          className={
            isEdit
              ? "flex items-center justify-between"
              : "flex items-center justify-end"
          }
        >
          {isEdit && (
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              type="button"
              onClick={() => closeModal && closeModal(false)}
            >
              Cancel
            </button>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isEdit ? "Save changes" : "Add book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUpdate;
