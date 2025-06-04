import NavigationButton from "../components/navigationButton";
import { useAuthContext } from "../auth/AuthContext";
import { logOut } from "../api/users";
import { useNavigate } from "react-router";
import { CreateRoom } from "../components/rooms/createRoom";
import AllRoomList from "../components/rooms/allRoomList";
import AllUsersList from "../components/users/allUserList";
import RequestList from "../components/booking/requestList";
import { useState } from "react";

export default function AdminDashboard() {
  const authContext = useAuthContext();
  const isAdmin = authContext.user?.role_names.includes("admin");
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  const handleSignOut = async () => {
    logOut()
      .then(() => navigate("/login"))
      .catch(() => alert("Unable to sign out"));
  };

  const handleAssignRoles = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="mx-auto w-full flex flex-col h-full">
        {/* Header */}
        <div className="bg-white shadow-lg p-6 flex-shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <div className="flex flex-wrap gap-3">
              {isAdmin && (
                <NavigationButton onClick={handleAssignRoles} color="purple">
                  User Dashboard
                </NavigationButton>
              )}
              <NavigationButton onClick={handleSignOut} color="gray">
                Sign Out
              </NavigationButton>
            </div>
          </div>
        </div>

        <div className="flex px-4 pb-4 gap-6 flex-1 min-h-0 overflow-hidden pt-3">
          {/* Column 1: Room Management */}
          <div className="flex flex-col gap-6 w-1/3 min-h-0">
            <div className="flex-shrink-0">
              <CreateRoom />
            </div>
            <div className="flex-1 min-h-0">
              <AllRoomList />
            </div>
          </div>

          {/* Column 2: Requests */}
          <div className="w-1/3 min-h-0">
            <RequestList success={success} setSuccess={setSuccess} />
          </div>

          {/* Column 3: Users */}
          <div className="w-1/3 min-h-0">
            <AllUsersList />
          </div>
        </div>
      </div>
    </div>
  );
}
