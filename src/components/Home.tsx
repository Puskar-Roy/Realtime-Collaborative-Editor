import ProfileCard from "./ProfileCard";
import { CgProfile } from "react-icons/cg";
import { MdDriveFileRenameOutline, MdOutlinePassword } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import UploadPic from "./UploadPic";

const Home = () => {
  const { state } = useAuthContext();
 
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  if (!state.user?.pic) {
    return <UploadPic />;
  }
  return (
    <div className="min-w-screen max-h-screen  flex items-center justify-center px-5 py-5 ">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl mt-0 sm:mt-[70px] w-full overflow-hidden flex flex-col gap-2 justify-center items-center min-h-[70vh]"
        style={{ maxWidth: "1000px" }}
      >
        <ProfileCard
          profilePic={`${state.user?.pic}`}
          userName={`${state.user?.name}`}
          email={`${state.user?.email}`}
        />
        <input
          className="w-full max-w-sm px-4 py-3 rounded-xl"
          placeholder="Enter Room Id"
        />
        <button className="w-full max-w-sm px-4 py-3 text-white rounded-xl bg-indigo-500 hover:bg-indigo-700">
          Join Room
        </button>
        <p className="mt-[20px] sm:mt-[30px]">
          Dont have an room id?{" "}
          <span className="text-indigo-500">New Room</span>
        </p>
      </div>
      <div className="absolute bottom-0 sm:top-0 py-4 w-screen h-[70px]">
        <ul className="flex justify-between items-center w-[80%] sm:w-[25%] mx-auto  flex-row">
          <li className="text-3xl cursor-pointer">
            <Link to="/uploadPic">
              <CgProfile />
            </Link>
          </li>
          <li className="text-3xl cursor-pointer">
            <Link to="">
              <MdDriveFileRenameOutline />
            </Link>
          </li>
          <li className="text-3xl cursor-pointer">
            <Link to="/forgotPassword">
              <MdOutlinePassword />
            </Link>
          </li>
          <li onClick={handleClick} className="text-3xl cursor-pointer">
            <IoMdLogOut />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
