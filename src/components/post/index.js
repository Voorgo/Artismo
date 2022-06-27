import Header from "./Header";
import Image from "./Image";
import LikeAndComment from "./LikeAndComment";

const PostCard = ({ fakeUser, loading }) => {
  return (
    <div className="max-w-screen-xs mt-10 border rounded-xl border-gray-300 overflow-hidden bg-white">
      <Header username={fakeUser.name} />
      <Image src={fakeUser.img} loading={loading} />
      <LikeAndComment likes={fakeUser.likes} />
    </div>
  );
};

export default PostCard;
