import Header from "../components/Header";
import { useAuth } from "../context/authContext";
import { useCurrentUser } from "../hooks/getCurrentUser";

const Profile = () => {
  const { user } = useAuth();
  const [currentUser] = useCurrentUser(user);

  return (
    <section className="min-h-screen flex-col relative ">
      <Header />
      <div className="h-[60px]"></div>
      <main className=" px-8 pt-[40px] max-w-[950px] mx-auto ">
        <section>
          <div className="flex gap-11 mb-[40px]">
            <div className="grow">
              <img
                src={require("../images/avatar.jpg")}
                className="w-32 h-32 object-cover md:w-60 md:h-60 max-w-none mx-auto"
                style={{
                  clipPath:
                    "polygon(23% 0, 100% 0, 100% 76%, 75% 100%, 0 100%, 0 23%)",
                }}
              />
            </div>
            <div className="flex flex-col gap-2 grow-[2]">
              <h2 className="text-5xl font-thin ">{currentUser?.username}</h2>
              <div>
                <span className="font-bold text-2xl">
                  {0} <span className="font-normal">arts</span>
                </span>
              </div>
              <div className="text-2xl font-bold">
                <span>{currentUser?.name}</span>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="max-w-[950px]  border-t h-[60px] "></div>
        </section>
      </main>
    </section>
  );
};

export default Profile;
