import { useEffect, useState } from "react";
import type { BookingRes, GetRoomsRes, RoomRes } from "../api/responseTypes";
import BookRoom from "../components/bookRoom";
import NavigationButton from "../components/navigationButton";
import { useAuthContext } from "../auth/AuthContext";
import { logOut } from "../api/auth";
import { useNavigate } from "react-router";
import RoomList from "../components/roomList";
import BookingList from "../components/bookingList";
import { getBookings, makeBooking, makeBookingRequest } from "../api/bookings";
import type { GetRoomsReq } from "../api/requestTypes";
import { getRooms } from "../api/rooms";

export default function Dashboard() {
  const [rooms, setRooms] = useState<RoomRes[]>([]);
  const [filters, setFilters] = useState<GetRoomsReq>(null);
  const [bookings, setBookings] = useState<BookingRes[]>(null);
  const [success, setSuccess] = useState<string>(null);
  const authContext = useAuthContext();
  const isAdmin = authContext.user?.roles.includes("admin");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await getBookings();
      setBookings(response.data);
    };

    fetchBookings();
  }, [success]);

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  const handleRoomsFound = (foundRooms: GetRoomsRes) => {
    setFilters(foundRooms.filters);
    setRooms(foundRooms.rooms);
  };

  const handleBookRoom = async (room: RoomRes) => {
    if (filters) {
      const req = {
        room_number: room.room_number,
        times: {
          start_datestr: filters.start_datestr,
          end_datestr: filters.end_datestr,
        },
      };
      if (room.request_only) {
        makeBookingRequest(req).then((response) => {
          setSuccess(
            `Succeessfully made request to book Room ${response.data.room_number}`
          );
          getRooms({
            min_capacity: filters.min_capacity,
            start_datestr: filters.start_datestr,
            end_datestr: filters.end_datestr,
          }).then((response) => handleRoomsFound(response.data));
        });
      } else {
        makeBooking(req).then((response) => {
          setSuccess(
            `Succeessfully made booking on Room ${response.data.room_number}`
          );
          getRooms({
            min_capacity: filters.min_capacity,
            start_datestr: filters.start_datestr,
            end_datestr: filters.end_datestr,
          }).then((response) => handleRoomsFound(response.data));
        });
      }
    }
  };

  const handleSignOut = async () => {
    logOut()
      .then(() => navigate("/login"))
      .catch(() => alert("Unable to sign out"));
  };

  const handleCreateRoom = () => {
    alert("Opening create room form...");
  };

  const handleViewRequests = () => {
    alert("Viewing room requests...");
  };

  const handleAssignRoles = () => {
    alert("Opening role assignment...");
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="mx-auto w-full flex flex-col h-full">
        <div className="bg-white shadow-lg p-6 mb-8 flex-shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

            <div className="flex flex-wrap gap-3">
              {isAdmin && (
                <>
                  <NavigationButton onClick={handleCreateRoom} color="green">
                    Create Room
                  </NavigationButton>

                  <NavigationButton onClick={handleViewRequests} color="orange">
                    View Requests
                  </NavigationButton>

                  <NavigationButton onClick={handleAssignRoles} color="purple">
                    Assign Roles
                  </NavigationButton>
                </>
              )}
              <NavigationButton onClick={handleSignOut} color="gray">
                Sign Out
              </NavigationButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row px-4 pb-4 gap-8 flex-1 min-h-0">
          <div className="flex flex-col flex-shrink-0">
            <BookRoom onRoomsFound={handleRoomsFound} />
            <RoomList
              rooms={rooms}
              filters={filters}
              handleBookRoom={handleBookRoom}
            />
          </div>

          <BookingList bookings={bookings} setSuccess={setSuccess} />
        </div>
      </div>
    </div>
  );
}
