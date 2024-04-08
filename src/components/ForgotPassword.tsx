
import RegisterImage from "../assets/RegisterImage";
import { FormEvent, useState } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { EmailInterface } from "../interfaces";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const { forgotPasswordEmail, error, isLoading, isSucess } =
    useForgotPassword();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Email: EmailInterface = {
      email,
    };
    try {
      await forgotPasswordEmail(Email);
    } catch (error) {
      console.log(error);
    }
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
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">
                FORGOT PASSWORD
              </h1>
              <p>Enter your registered email</p>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                disabled={isLoading}
                className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600"
              >
                Send OTP
              </button>
              {error && (
                <div className="bg-rose-200 text-rose-500 p-5 rounded-lg mt-4">
                  OTP not send failed!
                </div>
              )}
              {isSucess && (
                <div className="bg-green-200 text-green-500 p-5 rounded-lg mt-4">
                  OTP send successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
