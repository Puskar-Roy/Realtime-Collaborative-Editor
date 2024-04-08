import { useState } from "react";
import axios from "axios";
import { RegisterData } from "../interfaces";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isSucess, setisSucess] = useState<boolean>(false);
  const navigate = useNavigate();

  const register = async ({ name, email, password }: RegisterData) => {
    setisLoading(true);
    setError(false);
    try {
      await axios.post(`${import.meta.env.VITE_API}/api/v0.1/auth/register`, {
        name,
        email,
        password,
      });
      setisSucess(true);
      setisLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      console.error("Register error:", error);
      setError(true);
      setisSucess(false);
      setTimeout(() => {
        setisLoading(false);
      }, 5000);
    }
  };
  return { register, error, isLoading, isSucess };
};
