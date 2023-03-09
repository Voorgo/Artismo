import { useState } from "react";

const SmoothImage = ({ src }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="relative">
      <img
        src={src}
        alt="post"
        className={`transition-[opacity] duration-1000  w-full h-full ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />
      {!imageLoaded && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#f5f5f5] z-50">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};

export default SmoothImage;
