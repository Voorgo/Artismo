import Header from "./Header";
import LikeAndComment from "./LikeAndComment";
import Canvas from "../Canvas";

const PostCard = ({ user }) => {
  return (
    <div className="max-w-screen-xs mt-10 border rounded-xl border-gray-300 overflow-hidden bg-white">
      <Header username={user.username} />
      <Canvas />
      <LikeAndComment likes={user.likes} />
    </div>
  );
};

export default PostCard;
