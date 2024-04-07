import React from "react";

interface ProfileCardProps {
  userName: string;
  profilePic: string;
  email:string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userName, profilePic , email }) => {
  return (
    <div className="bg-white p-6 shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4">
      <div className="flex flex-col items-center">
        <img
          src={profilePic}
          className="w-28 h-w-28 rounded-full"
          alt="Profile"
        />
        <div className="mt-4 text-center">
          <p className="text-xl text-[#333] font-extrabold">{userName}</p>
          <p className="text-sm text-gray-500 mt-2">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
