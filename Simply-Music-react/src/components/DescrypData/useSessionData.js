// useSessionData.js
import { useEffect, useState } from 'react';

const useSessionData = (decryptData) => {
  const [userId, setUserId] = useState(null);
  console.log(userId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = localStorage.getItem("sessionData");
        if (sessionData) {
          const decryptedData = await decryptData(sessionData);
          setUserId(decryptedData.userId);
        }
      } catch (error) {
        console.error("Error during session decryption:", error);
      }
    };

    fetchData();
  }, [decryptData]);

  return { userId };
};

export default useSessionData;
