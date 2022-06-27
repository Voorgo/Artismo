import { useEffect, useState } from "react";
import PostCard from "./post";
const fakeUser = [
  {
    name: "Angel Mikail",
    img: "images/pexels-adrianna-l-12263516.jpg",
    likes: 5,
    comments: ["Nice one", "Good looking", "Superb", "Best of the best"],
  },
  {
    name: "Alex Nom",
    img: "images/pexels-svitlana-myslyvets-12441516.jpg",
    likes: 10,
    comments: ["Good Job", "Fire", "Thumbs up"],
  },
  {
    name: "Not Dam",
    img: "images/pexels-poyee-tsang-12139755.jpg",
    likes: 5,
    comments: ["Nice one", "Good looking", "Superb", "Best of the best"],
  },
  {
    name: "Andrei Iss",
    img: "images/pexels-svitlana-myslyvets-12441516.jpg",
    likes: 2,
    comments: ["Nice one", "Good looking", "Superb", "Best of the best"],
  },
  {
    name: "Top Dooo",
    img: "images/pexels-adrianna-l-12263516.jpg",
    likes: 5,
    comments: ["Nice one", "Good looking", "Superb", "Best of the best"],
  },
];

const Main = () => {
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });
  return (
    <main>
      <section className="max-w-screen-xs  mx-auto  flex-col ">
        <div className="h-[60px] w-full"></div>
        {fakeUser.map((user) => (
          <PostCard fakeUser={user} loading={IsLoading} />
        ))}
        <div></div>
      </section>
    </main>
  );
};

export default Main;
