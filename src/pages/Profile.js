import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GenerateArtModal from "../components/GenerateArtModal";
import Header from "../components/Header";
import NoUserFound from "../components/NoUserFound";
import ImageCard from "../components/profile/ImageCard";
import { useAuth } from "../context/authContext";
import UploadPhotoModal from "../components/profile/UploadPhotoModal";
import { getUserProfile, getUserPosts } from "../utils/getUser";

const Profile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  const params = useParams();
  const [loading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {
    setPosts([]);
    getUserProfile(params.username, setUserProfile, setIsLoading);
    getUserPosts(params.username, setPosts);
  }, [params.username, user?.email]);

  if (loading) return null;
  return (
    <section className="min-h-screen flex-col relative ">
      <Header />
      <div className="h-[60px]"></div>
      <main className=" px-8 pt-[40px] max-w-[950px] mx-auto ">
        <section>
          {userProfile.emailAddress ? (
            <div className="flex gap-11 mb-[40px]">
              <div className="grow flex flex-col gap-4">
                {userProfile.emailAddress ? (
                  <>
                    <img
                      src={
                        userProfile.userPhoto
                          ? userProfile.userPhoto
                          : require("../images/user.png")
                      }
                      className={`w-32 h-32 object-cover md:w-60 md:h-60 max-w-none mx-auto ${
                        user?.email === userProfile.emailAddress
                          ? "cursor-pointer"
                          : null
                      }`}
                      style={{
                        clipPath:
                          "polygon(23% 0, 100% 0, 100% 76%, 75% 100%, 0 100%, 0 23%)",
                      }}
                      alt="profile"
                      onClick={() =>
                        user?.email === userProfile.emailAddress
                          ? setToggleModal(true)
                          : null
                      }
                    />
                    {user?.email === userProfile.emailAddress && (
                      <UploadPhotoModal
                        setToggleModal={setToggleModal}
                        toggleModal={toggleModal}
                        id={userProfile.id}
                        email={user?.email}
                      />
                    )}
                  </>
                ) : null}
              </div>
              <div className="flex flex-col gap-2 grow-[2]">
                <h2 className="text-5xl font-thin ">{userProfile?.username}</h2>
                <div>
                  <span className="font-bold text-2xl">
                    {posts.length}
                    <span className="font-normal"> posts</span>
                  </span>
                </div>
                <div className="text-2xl font-bold">
                  <span>{userProfile?.name}</span>
                </div>
              </div>
            </div>
          ) : (
            <NoUserFound />
          )}
          {user?.email === userProfile.emailAddress && user?.email ? (
            <div className="w-full flex justify-center pb-4">
              <button
                onClick={() => setVisible(true)}
                className="w-52 font-semibold bg-blue-500 text-white py-3 rounded-xl text-3xl flex justify-center gap-2 items-center  active:bg-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Create art
              </button>
              <GenerateArtModal
                visible={visible}
                setVisible={setVisible}
                username={userProfile.username}
                email={user?.email}
              />
            </div>
          ) : null}
        </section>
        <section>
          <div className="max-w-[950px]  border-t">
            <div
              className={`w-full grid grid-cols-2 gap-5 h-full pt-8 xs:grid-cols-3 md:gap-8`}
            >
              {posts.length < 1 ? (
                <p className="col-span-3 text-center font-semibold text-4xl">
                  No posts
                </p>
              ) : (
                <>
                  {posts.map((post, i) => (
                    <ImageCard
                      post={post}
                      key={post.id}
                      user={user}
                      userProfile={userProfile}
                      posts={posts}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Profile;
