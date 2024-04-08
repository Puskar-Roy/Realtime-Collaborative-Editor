import { Link } from "react-router-dom";
import RegisterImage from "../assets/RegisterImage";
import { ChangeEvent, FormEvent, useState } from "react";
import { useVerifyOTP } from "../hooks/useVerifyOTP";
import { useAuthContext } from "../hooks/useAuthContext";
import { CheckOTPInterface } from "../interfaces";

const VerifyPassword = () => {
  const { verifyOTP, error, isLoading, isSucess } = useVerifyOTP();
  const { state } = useAuthContext();
  const [formData, setFormData] = useState<CheckOTPInterface>({
    token: "",
    newPassword: "",
    email: "",
  });
  const { token, newPassword } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verifyOTPdata = {
      token: formData.token,
      newPassword: formData.newPassword,
      email: state.user?.email,
    };
    await verifyOTP(verifyOTPdata);
  };
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
            <div className="text-center mb-2">
              <h1 className="font-bold text-3xl text-gray-900">VERIFY OTP</h1>
              <p>Verify your OTP and change your password</p>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="otp" className="block mb-2">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="token"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5"
                value={token}
                onChange={handleChange}
              />

              <label htmlFor="newPassword" className="block mb-2">
                Enter New Password
              </label>
              <input
                type="text"
                id="newPassword"
                name="newPassword"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5"
                value={newPassword}
                onChange={handleChange}
              />

              <div className="flex gap-1 justify-end mb-3 sm:mb-0">
                Did not recive the OTP?
                <Link to="/forgotPassword" className="text-indigo-500">
                  Send OTP
                </Link>
              </div>

              <button
                disabled={isLoading}
                className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600"
              >
                Change Password
              </button>
              {error && (
                <div className="bg-rose-200 text-rose-500 p-5 rounded-lg mt-4">
                  Invalid credentials
                </div>
              )}
              {isSucess && (
                <div className="bg-green-200 text-green-500 p-5 rounded-lg mt-4">
                  Password Changed Successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPassword;
