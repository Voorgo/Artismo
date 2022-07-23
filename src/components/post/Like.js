const Like = ({ likes }) => {
  return (
    <div className="flex gap-3 p-5">
      <div className="flex gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="h-10 w-10 cursor-pointer"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      {likes ? (
        <div className="text-xl font-bold self-center leading-4">
          {likes} {likes === 1 ? "like" : "likes"}
        </div>
      ) : null}
    </div>
  );
};

export default Like;
