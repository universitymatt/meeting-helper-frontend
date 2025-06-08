import { useEffect, useState } from "react";
import type { BookingRes, GetRoomsRes, RoomRes } from "../api/responseTypes";
import BookRoom from "../components/rooms/bookRoom";
import NavigationButton from "../components/navigationButton";
import { useAuthContext } from "../auth/AuthContext";
import { logOut } from "../api/users";
import { useNavigate } from "react-router";
import RoomList from "../components/rooms/roomList";
import BookingList from "../components/booking/bookingList";
import { getBookings, makeBooking, makeBookingRequest } from "../api/bookings";
import type { GetRoomsReq } from "../api/requestTypes";
import { getAvailableRooms } from "../api/rooms";
import AlertBanner from "../components/alert";

export default function Dashboard() {
  const [rooms, setRooms] = useState<RoomRes[]>([]);
  const [filters, setFilters] = useState<GetRoomsReq>();
  const [bookings, setBookings] = useState<BookingRes[]>();
  const [success, setSuccess] = useState<string>();
  const authContext = useAuthContext();
  const isAdmin = authContext.user?.role_names.includes("admin");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await getBookings();
      setBookings(response.data);
    };

    fetchBookings();
  }, [success]);

  const handleRoomsFound = (foundRooms: GetRoomsRes) => {
    setFilters(foundRooms.filters);
    setRooms(foundRooms.rooms);
  };

  const handleBookRoom = async (room: RoomRes) => {
    if (filters) {
      const req = {
        room_number: room.room_number,
        start_datetime: filters.start_datetime,
        end_datetime: filters.end_datetime,
      };
      if (room.request_only) {
        makeBookingRequest(req).then((response) => {
          setSuccess(
            `Succeessfully made request to book Room ${response.data.room_number}`
          );
          getAvailableRooms({
            min_capacity: filters.min_capacity,
            start_datetime: filters.start_datetime,
            end_datetime: filters.end_datetime,
          }).then((response) => handleRoomsFound(response.data));
        });
      } else {
        makeBooking(req).then((response) => {
          setSuccess(
            `Succeessfully made booking on Room ${response.data.room_number}`
          );
          getAvailableRooms({
            min_capacity: filters.min_capacity,
            start_datetime: filters.start_datetime,
            end_datetime: filters.end_datetime,
          }).then((response) => handleRoomsFound(response.data));
        });
      }
    }
  };

  const handleSignOut = async () => {
    logOut()
      .then(() => navigate("/meeting-helper-frontend/login"))
      .catch(() => alert("Unable to sign out"));
  };

  const handleAssignRoles = () => {
    navigate("/meeting-helper-frontend/admin");
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="mx-auto w-full flex flex-col h-full">
        <div className="bg-white shadow-lg p-6 flex-shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

            <div className="flex flex-wrap gap-3">
              {isAdmin && (
                <NavigationButton onClick={handleAssignRoles} color="purple">
                  Admin Dashboard
                </NavigationButton>
              )}
              <NavigationButton onClick={handleSignOut} color="gray">
                Sign Out
              </NavigationButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-shrink-0">
          <BookRoom onRoomsFound={handleRoomsFound} />
        </div>
        {success && <AlertBanner severity={"success"} detail={success} />}
        <div className="flex flex-col lg:flex-row px-4 pb-4 gap-8 flex-1 min-h-0">
          <RoomList
            rooms={rooms}
            filters={filters}
            handleBookRoom={handleBookRoom}
          />
          <BookingList bookings={bookings} setSuccess={setSuccess} />
        </div>
      </div>
    </div>
  );
}
