import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Image = ({ src, loading }) => {
  return (
    <div className="relative w-full h-full pb-[100%] ">
      {loading ? (
        <Skeleton
          width={"100%"}
          height={"100%"}
          style={{ position: "absolute" }}
        />
      ) : (
        <img
          src={src}
          alt="post img"
          className="block w-full h-full absolute top-0 left-0 object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
};

export default Image;
