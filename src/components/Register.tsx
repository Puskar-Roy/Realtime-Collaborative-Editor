import { Link } from "react-router-dom";
import RegisterImage from "../assets/RegisterImage";
import { useRegister } from "../hooks/useRegister";
import { ChangeEvent, FormEvent, useState } from "react";
import { RegisterData } from "../interfaces";
import Loder from "./Loder";

export function GoogleAuth() {
  const googleAuthHandler = () => {
    window.open(`${import.meta.env.VITE_API}/auth/google`, "_self");
  };

  return (
    <div className="google flex justify-center">
      <button
        className="gsi-material-button"
        onClick={() => googleAuthHandler()}
      >
        <div className="gsi-material-button-state"></div>
        <div className="gsi-material-button-content-wrapper">
          <div className="gsi-material-button-icon">
            <svg
              className="h-10 mb-2"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{ display: "block" }}
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          <span className="gsi-material-button-contents">
            Sign in with Google
          </span>
          <span style={{ display: "none" }}>Sign in with Google</span>
        </div>
      </button>
    </div>
  );
}

const Register = () => {
  const { register, error, isLoading, isSucess } = useRegister();
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(formData);
  };
  return (
    <div className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <RegisterImage />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
              <p>Enter your information to register</p>
            </div>
            {isLoading ? (
              <Loder />
            ) : (
              <form onSubmit={handleSubmit}>
                <label htmlFor="username" className="block mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5"
                  value={name}
                  onChange={handleChange}
                />

                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5"
                  value={email}
                  onChange={handleChange}
                />

                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5"
                  value={password}
                  onChange={handleChange}
                />
                <div className="flex gap-1 justify-end mb-3 sm:mb-0">
                  Already have an account?
                  <Link to="/" className="text-indigo-500">
                    Login
                  </Link>
                </div>

                <button
                  disabled={isLoading}
                  className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600"
                >
                  Register
                </button>
                <div className="oauth mt-4">
                  <p className="text-center">Or Register with</p>
                  <div className="flex justify-center mt-4">
                    <GoogleAuth />
                  </div>
                </div>
                {error && (
                  <div className="bg-rose-200 text-rose-500 p-5 rounded-lg mt-4">
                    Invalid credentials
                  </div>
                )}
                {isSucess && (
                  <div className="bg-green-200 text-green-500 p-5 rounded-lg mt-4">
                    Register Done!, A Verification link send to your Gmail.
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
