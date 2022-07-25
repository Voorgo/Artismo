import Header from "./Header";
import Like from "./Like";
import SmoothImage from "./SmoothImage";

const PostCard = ({ post }) => {
  return (
    <div className="max-w-screen-xs mt-10 border rounded-xl border-gray-300 bg-white">
      <Header username={post.username} />
      <SmoothImage src={post.src} />
      <Like likes={post.likes} id={post.id} />
    </div>
  );
};

export default PostCard;
