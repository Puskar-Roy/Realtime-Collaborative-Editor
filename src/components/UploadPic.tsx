import profilePic from "../assets/profile.png";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import RegisterImage from "../assets/RegisterImage";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const UploadPic = () => {
  const { state, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/api/v0.1/users/${state.user?.id}/profile`,
        formData
      );
      const user = state.user;
      dispatch({ type: "LOGIN", payload: { ...user, pic: response.data.pic } });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, pic: response.data.pic })
      );
      alert("Image uploaded successfully");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="md:flex flex-row-reverse w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <RegisterImage />
          </div>
          <div className="w-full flex flex-col gap-[4rem] md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">
                UPLOAD YOUR PICTURE
              </h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex justify-center items-center flex-col gap-5 "
            >
              <div>
                <label
                  htmlFor="pic"
                  className="mb-2 flex justify-center items-center"
                >
                  <img
                    className="h-[120px] cursor-pointer rounded-lg"
                    src={imageUrl || profilePic}
                    alt="Profile Pic"
                  />
                </label>
                <input
                  type="file"
                  id="pic"
                  name="file"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>

              <button className="bg-indigo-500 text-center text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600">
                Upload Picture
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPic;
