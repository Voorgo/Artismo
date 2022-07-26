import Header from "../components/Header";
import Timeline from "../components/Timeline";
import { useEffect } from "react";
import Sidebar from "../components/sidebar";

const Home = () => {
  useEffect(() => {
    document.title = "Artismo";
  }, []);
  return (
    <section className="min-h-screen md:flex md:justify-center md:gap-16">
      <Header />
      <Timeline />
      <Sidebar />
    </section>
  );
};

export default Home;
