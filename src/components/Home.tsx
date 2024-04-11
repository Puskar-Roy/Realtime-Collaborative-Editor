import { useState } from "react";
import ProfileCard from "./ProfileCard";
import { CgProfile } from "react-icons/cg";
import { MdDriveFileRenameOutline, MdOutlinePassword } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import UploadPic from "./UploadPic";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState(false);
  const [isSucess, setIsSucess] = useState(false);
  const { state } = useAuthContext();
  const navigate = useNavigate();

  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  if (!state.user?.pic) {
    return <UploadPic />;
  }

  const handleNewClick = () => {
    const uuidValue = uuidv4();
    setRoomId(uuidValue);
    setIsSucess(true);

    setTimeout(() => {
      setIsSucess(false);
    }, 1500);
  };

  const handleSubmit = () => {
    if (!roomId) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
      return;
    }
    const nameForEditor = state.user?.name;
    navigate(`/editor/${roomId}/${nameForEditor}`, {
      state: { nameForEditor },
    });
  };

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
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full max-w-sm px-4 py-3 text-white rounded-xl bg-indigo-500 hover:bg-indigo-700"
        >
          Join Room
        </button>
        {isSucess && (
          <div className="bg-green-200 text-green-500 px-[100px] py-4 rounded-lg mt-4">
            Successfully room created!
          </div>
        )}
        {error && (
          <div className="bg-rose-200 text-rose-500 px-[100px] py-4 rounded-lg mt-4">
            Plese enter a room id
          </div>
        )}
        <p className="mt-[20px] sm:mt-[30px]">
          Dont have an room id?{" "}
          <span
            onClick={handleNewClick}
            className="text-indigo-500 cursor-pointer"
          >
            New Room
          </span>
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
