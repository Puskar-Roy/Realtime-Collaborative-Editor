import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { CheckOTPInterface } from "../interfaces";

export const useVerifyOTP = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isSucess, setisSucess] = useState<boolean>(false);

  const verifyOTP = async ({
    email,
    newPassword,
    token,
  }: CheckOTPInterface) => {
    if (!email) {
      throw new Error("Email Not Send!");
    }
    setisLoading(true);
    setError(false);
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/api/v0.1/auth/reset-password`,
        {
          email,
          newPassword,
          token,
        }
      );
      setisSucess(true);
      setisLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      console.error("Password Change Error:", error);
      setError(true);
      setisSucess(false);
      setTimeout(() => {
        setisLoading(false);
      }, 5000);
    }
  };
  return { verifyOTP, error, isLoading, isSucess };
};
