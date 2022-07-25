import { useState } from "react";

const SmoothImage = ({ src }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="relative">
      <img
        src={src}
        alt="post"
        className={`transition-[opacity] duration-1000 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <div className="absolute top-0 left-0 max-w-[418px] max-h-[418px] bg-[#f5f5f5] z-50">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};

export default SmoothImage;
