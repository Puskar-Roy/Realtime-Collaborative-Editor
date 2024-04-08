import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import RegisterImage from "../assets/RegisterImage";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { login, error, isLoading, isSucess } = useLogin();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    await login(loginData);
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
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
              <p>Enter your information to login</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
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

                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex gap-1 justify-end mb-3 sm:mb-0">
                  Do not have an account?
                  <Link to="/register" className="text-indigo-500">
                    Register
                  </Link>
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600"
                >
                  Login
                </button>
              </div>
              {error && (
                <div className="bg-rose-200 text-rose-500 p-5 rounded-lg mt-4">
                  Invalid credentials or Email is not verified, if email not verified We will send a email into your account.
                </div>
              )}
              {isSucess && (
                <div className="bg-green-200 text-green-500 p-5 rounded-lg mt-4">
                  Login Done!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
