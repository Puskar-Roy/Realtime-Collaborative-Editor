import { useState } from "react";
import axios from "axios";
import { RegisterData } from "../interfaces";

export const useRegister = () => {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isSucess, setisSucess] = useState<boolean>(false);

  const register = async ({ name, email, password }: RegisterData) => {
    setisLoading(true);
    setError(false);
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/api/v0.1/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      setisSucess(true);
      setisLoading(false);
    } catch (error) {
      console.error("Register error:", error);
      setError(true);
      setisSucess(false);
      setisLoading(false);
    }
  };
  return { register, error, isLoading, isSucess };
};
