import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { EmailInterface } from "../interfaces";

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isSucess, setisSucess] = useState<boolean>(false);

  const forgotPasswordEmail = async ({ email }: EmailInterface) => {
    if (!email) {
      throw new Error("Email Not Send!");
    }
    setisLoading(true);
    setError(false);
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/api/v0.1/auth/forgot-password`,
        {
          email,
        }
      );
      setisSucess(true);
      setisLoading(false);
      setTimeout(() => {
           navigate("/verifyPassword");
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
  return { forgotPasswordEmail, error, isLoading, isSucess };
};
