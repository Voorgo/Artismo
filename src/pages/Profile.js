import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import NoUserFound from "../components/NoUserFound";
import { useAuth } from "../context/authContext";
import { db } from "../firebase";

const Profile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  const params = useParams();
  const [loading, setIsLoading] = useState(true);

  const userRef = query(
    collection(db, "users"),
    where("username", "==", params.username)
  );
  useEffect(() => {
    getDocs(userRef).then((snapshot) => {
      snapshot.forEach((doc) => setUserProfile({ ...doc.data() }));
      setIsLoading(false);
    });
  }, [params]);

  if (loading) return null;
  return (
    <section className="min-h-screen flex-col relative ">
      <Header />
      <div className="h-[60px]"></div>
      <main className=" px-8 pt-[40px] max-w-[950px] mx-auto ">
        <section>
          {userProfile.emailAddress ? (
            <div className="flex gap-11 mb-[40px]">
              <div className="grow">
                {userProfile.emailAddress ? (
                  <img
                    src={
                      user?.email === userProfile.emailAddress
                        ? require("../images/avatar.jpg")
                        : require("../images/user.png")
                    }
                    className="w-32 h-32 object-cover md:w-60 md:h-60 max-w-none mx-auto"
                    style={{
                      clipPath:
                        "polygon(23% 0, 100% 0, 100% 76%, 75% 100%, 0 100%, 0 23%)",
                    }}
                    alt="profile"
                  />
                ) : null}
              </div>
              <div className="flex flex-col gap-2 grow-[2]">
                <h2 className="text-5xl font-thin ">{userProfile?.username}</h2>
                <div>
                  <span className="font-bold text-2xl">
                    {0} <span className="font-normal">arts</span>
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
        </section>
        <section>
          <div className="max-w-[950px]  border-t h-[60px] "></div>
        </section>
      </main>
    </section>
  );
};

export default Profile;
