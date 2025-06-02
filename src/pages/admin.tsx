import { useEffect, useState } from "react";
import type { BookingRes, GetRoomsRes, RoomRes } from "../api/responseTypes";
import BookRoom from "../components/bookRoom";
import NavigationButton from "../components/navigationButton";
import { useAuthContext } from "../auth/AuthContext";
import { logOut } from "../api/auth";
import { useNavigate } from "react-router";
import BookingList from "../components/bookingList";
import { CreateRoom } from "../components/createRoom";
import AllRoomList from "../components/allRoomList";

export default function AdminDashboard() {
  const authContext = useAuthContext();
  const isAdmin = authContext.user?.roles.includes("admin");
  const navigate = useNavigate();

  const handleSignOut = async () => {
    logOut()
      .then(() => navigate("/login"))
      .catch(() => alert("Unable to sign out"));
  };

  const handleAssignRoles = () => {
    navigate("/");
  };

  // need in admin dashboard
  // column 1
  // create a room
  // view rooms (to delete)

  // column 2
  // view requests

  // column 3
  // assign roles

  return (
    <div className="h-screen flex flex-col">
      <div className="mx-auto w-full flex flex-col h-full">
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
        {/* <div className="flex flex-col flex-shrink-0">
          <BookRoom onRoomsFound={handleRoomsFound} />
        </div> */}
        <div className="flex flex-col lg:flex-row px-4 pb-4 gap-8 flex-1 min-h-0">
          <CreateRoom />
          <AllRoomList admin={true} />
          {/* <BookingList bookings={bookings} setSuccess={setSuccess} /> */}
        </div>
      </div>
    </div>
  );
}
