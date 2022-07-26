import YourProfile from "./YourProfile";
import Suggestions from "./Suggestions";

const Sidebar = () => {
  return (
    <div className="sticky top-[90px] h-full hidden md:block">
      <YourProfile />
      <Suggestions />
    </div>
  );
};

export default Sidebar;
