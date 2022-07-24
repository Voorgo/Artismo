import Header from "./Header";
import Like from "./Like";
const PostCard = ({ user }) => {
  return (
    <div className="max-w-screen-xs mt-10 border rounded-xl border-gray-300 overflow-hidden bg-white">
      <Header username={user.username} />
      <img src={user.imageSrcAndLikes.at(-1).src} alt="post" />
      <Like likes={user.likes} />
    </div>
  );
};

export default PostCard;
