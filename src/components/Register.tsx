import { Link } from "react-router-dom";
import RegisterImage from "../assets/RegisterImage";
import { useRegister } from "../hooks/useRegister";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { RegisterData } from "../interfaces";
import Loder from "./Loder";

import GoogleAuth from "./GoogleAuth";

function DisplayOAuthOptions() {
  return (
    <div className="oauth mt-4">
      <p className="text-center">Or Register with</p>
      <div className="flex justify-center mt-4">
        <GoogleAuth />
      </div>
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

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(formData);
  }, []);
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
              <>
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
                <DisplayOAuthOptions />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
