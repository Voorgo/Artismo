import Header from "../components/Header";
import Timeline from "../components/Timeline";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Artismo";
  }, []);
  return (
    <section className="min-h-screen">
      <Header />
      <Timeline />
    </section>
  );
};

export default Home;
