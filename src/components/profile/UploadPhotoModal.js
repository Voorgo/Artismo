import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";

const UploadPhotoModal = ({ toggleModal, setToggleModal, id, email }) => {
  const [image, setImage] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const storage = getStorage();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (image) {
      const imageRef = ref(storage, `${id}/image.png`);
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              updateDoc(doc(db, "users", email), {
                userPhoto: url,
              });
              setConfirmation(true);
              setTimeout(() => setConfirmation(false), 2000);
              setImage(null);
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return;
    }
  };

  const closeModal = (e) => {
    if (e.target.id === "photoModal" || e.target.id === "closeButton") {
      setToggleModal(false);
      setConfirmation(false);
    }
  };

  if (!toggleModal) return null;
  return (
    <div
      id="photoModal"
      className="fixed inset-0 bg-[#757575a6] z-50 flex justify-center items-center"
      onClick={closeModal}
    >
      {confirmation && (
        <div className="absolute top-3 w-52 h-20 bg-white rounded-lg shadow-xl flex items-center justify-center gap-3 text-2xl font-semibold">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-11 w-11 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          Success!
        </div>
      )}
      <div className="bg-white flex flex-col justify-center rounded-lg overflow-hidden">
        <h2 className="text-3xl font-semibold border-b border-[#dbdbdb] min-h-[48px] flex items-center justify-center">
          Change Profile Photo
        </h2>
        <input
          type="file"
          className="text-xl border-b border-[#dbdbdb] min-h-[48px] pt-5 pl-7"
          onChange={handleImageChange}
        />
        <button
          className="text-2xl font-bold text-blue-600 border-b border-[#dbdbdb] min-h-[48px] active:bg-[#dbdbdb]"
          onClick={handleSubmit}
        >
          Upload
        </button>
        <button
          id="closeButton"
          onClick={closeModal}
          className="text-2xl font-bold text-red-600 min-h-[48px] active:bg-[#dbdbdb]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadPhotoModal;
