import { getStorage, ref, deleteObject } from "firebase/storage";
import { useState } from "react";

const ImageCard = ({ post, fileRef, deletePost, user, userProfile }) => {
  const storage = getStorage();
  const imageRef = ref(storage, fileRef);
  const [visible, setVisible] = useState(false);

  const deleteImage = () => {
    deleteObject(imageRef)
      .then(() => deletePost((prev) => !prev))
      .catch((error) => console.log(error));
  };

  return (
    <>
      {visible ? (
        <div className="absolute inset-0 bg-[#757575a6] z-50 flex items-center justify-center">
          <div className="w-max h-max bg-white rounded-md flex flex-col gap-5 shadow-lg pb-5 pt-10">
            <p className="grow self-center flex items-center text-2xl mx-10">
              Are you sure you want to remove this post?
            </p>
            <div className="self-end px-4 flex gap-4">
              <button
                className="py-3 px-5 text-xl font-semibold text-white bg-blue-600 rounded-md active:bg-blue-500"
                onClick={() => setVisible(false)}
              >
                No
              </button>
              <button
                className="py-3 px-5 text-xl font-semibold text-white bg-red-500 rounded-md active:bg-red-400"
                onClick={deleteImage}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="relative group">
        <div className="absolute inset-0 hover:bg-[#383838ad] flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white hidden group-hover:block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          {user?.email === userProfile.emailAddress ? (
            <div
              className="absolute top-1 right-1 z-50 cursor-pointer hidden group-hover:block"
              onClick={() => setVisible(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : null}
        </div>
        <img src={post} alt="art" className="w-full h-full max-w-none" />
      </div>
    </>
  );
};

export default ImageCard;
