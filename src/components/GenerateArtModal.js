import { useEffect, useRef, useState } from "react";
import randomizeCanvas from "../utils/randomizeCanvas";
import { getStorage, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";

const GenerateArtModal = ({ visible, setVisible, username, addPost }) => {
  const [color, setColor] = useState("");
  const canvasRef = useRef(null);
  const [currentData, setCurrentData] = useState("");
  const [status, setStatus] = useState("Please press generate, for image.");
  const [confirmation, setConfirmation] = useState(false);
  const storage = getStorage();
  const storageRef = ref(storage, `${username}/${v4()}`);
  const closeModal = (e) => {
    if (
      e.target.id === "container" ||
      e.target.tagName === "svg" ||
      e.target.tagName === "path"
    ) {
      setVisible(false);
      setColor("");
      setConfirmation(false);
      setCurrentData("");
      setStatus("Please press generate, for image.");
    }
  };

  if (!visible) return null;
  return (
    <div
      id="container"
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
      <div className="flex flex-col gap-10 bg-white p-10 pt-20 rounded-lg relative shadow-lg">
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={(e) => {
            closeModal(e);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-600  active:text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {status && (
          <p className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 w-full text-center -translate-y-1/2 text-3xl font-semibold">
            {status}
          </p>
        )}
        <div className="max-w-[418px] ">
          <canvas
            ref={canvasRef}
            width="418"
            height="418"
            className="w-full"
          ></canvas>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                randomizeCanvas(color, canvasRef);
                setCurrentData(canvasRef.current.toDataURL());
                setStatus("");
              }}
              className="font-semibold bg-blue-500 text-white select-none p-3 rounded-lg text-3xl flex justify-center gap-2 items-center  active:bg-blue-400"
            >
              Generate
            </button>
            <button
              onClick={() => {
                if (currentData) {
                  uploadString(storageRef, currentData, "data_url").then(
                    (snapshot) => {
                      setConfirmation(true);
                      setTimeout(() => setConfirmation(false), 2000);
                      addPost((prev) => !prev);
                      randomizeCanvas(color, canvasRef);
                    }
                  );
                } else {
                  setStatus("No image, please press generate.");
                }
              }}
              className="font-semibold bg-blue-500 text-white select-none py-3 px-5 rounded-lg text-3xl flex justify-center gap-2 items-center  active:bg-blue-400"
            >
              Post
            </button>
          </div>

          <div className="flex items-center text-2xl font-semibold gap-3 self-center select-none">
            Color:
            <input
              type="color"
              onChange={(e) => setColor(e.target.value)}
              aria-label="pick color"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateArtModal;
