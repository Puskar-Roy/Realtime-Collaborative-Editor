import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import Loder from "./Loder";

function GauthUSer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("user");

  let authMessage = "Yeah we got you";

  const { dispatch } = useAuthContext();

  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(`/oauth/user/${userId}`);
      const userData = response.data;
      setIsLoading(false);
      console.log("User Data:", userData);
      if (!userData.success) {
        authMessage="Something went wrong, please try again later";
        throw new Error("Something went wrong");
      }
      dispatch({ type: "LOGIN", payload: userData });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      // redirect to register page
      setTimeout(() => {
        window.location.href = "/";
      }, 10_000);
    }
  };

  useEffect(() => {
    fetchUserData(userId as string);
  }, [userId]); // Run only when userId changes

  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      {isLoading ? (
        <Loder />
      ) : (
        <>
          <div className="flex">
            <h2> {authMessage}</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default GauthUSer;