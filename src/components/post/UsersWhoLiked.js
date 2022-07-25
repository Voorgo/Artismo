import { v4 } from "uuid";

const UsersWhoLiked = ({ users }) => {
  return (
    <div className="absolute z-50 top-full bg-[#3b3b3ba6] mt-4 p-4 rounded-md text-white hidden group-hover:block">
      <ul className="flex flex-col gap-3">
        {users.map((user) => (
          <li key={v4()}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersWhoLiked;
