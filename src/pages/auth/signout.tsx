import { useEffect } from "react";
import { useNavigate } from "react-router";
// import { VystaClient } from "@datavysta/vysta-client";
// import { getVystaUrl } from "~/utils/getVystaUrl";
// import { UserSessionService } from "~/models/services";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleLogout() {
      // try {
      //   // Get session token from localStorage
      //   const sessionToken = localStorage.getItem("sessionToken");
      //   const userId = localStorage.getItem("userId");
      //   if (sessionToken && userId) {
      //     // Create Vysta client and authenticate
      //     const client = new VystaClient({
      //       baseUrl: getVystaUrl(),
      //       debug: true,
      //     });
      //     await client.login(
      //       import.meta.env.VITE_REACT_APP_VYSTA_USERNAME,
      //       import.meta.env.VITE_REACT_APP_VYSTA_PASSWORD
      //     );
      //     const userSessionService = new UserSessionService(client);
      //     // Find and delete the session
      //     const sessions = await userSessionService.getAll();
      //     const session = sessions.data.find(
      //       (s) => s.sessionToken === sessionToken && s.userID === userId
      //     );
      //     if (session) {
      //       await userSessionService.delete(session.id);
      //     }
      //   }
      //   // Clear localStorage
      //   localStorage.removeItem("sessionToken");
      //   localStorage.removeItem("userId");
      //   localStorage.removeItem("slipstreamAccountId");
      //   localStorage.removeItem("statusId");
      //   // Redirect to login
      //   navigate("/auth/login");
      // } catch (error) {
      //   console.error("Logout error:", error);
      //   // Still redirect to login even if there's an error
      navigate("/auth/login");
      // }
    }

    handleLogout();
  }, [navigate]);

  return null; // No UI needed as we're just handling the logout process
}
