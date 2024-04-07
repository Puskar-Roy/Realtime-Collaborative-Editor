
import { Link } from "react-router-dom";
import RegisterImage from "../assets/RegisterImage";

const VerifyPassword = () => {
  return (
    <div className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5">
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
              <h1 className="font-bold text-3xl text-gray-900">VERIFY OTP</h1>
              <p>Verify your OTP</p>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">
                OTP
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5"
              />

              <div className="flex gap-1 justify-end mb-3 sm:mb-0">
                Did not recive the OTP?
                <Link to="/forgotPassword" className="text-indigo-500">
                  Send OTP
                </Link>
              </div>

              <button className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600">
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPassword;
