import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function GauthUSer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('user');

  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(`/oauth/user/${userId}`);
      const userData = response.data;
      console.log('User Data:', userData);
      // Use userData in your component logic
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle errors appropriately
    }
  };

  useEffect(() => {
    fetchUserData(userId as string);
  }, [userId]); // Run only when userId changes

  return (
    <div>
      {/* Display user data here (if available) */}
    </div>
  );
}

export default GauthUSer;
      