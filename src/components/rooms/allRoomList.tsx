import { useEffect, useState } from "react";
import RoomTile from "./roomTile";
import { deleteRoom, getAllRooms } from "../../api/rooms";
import type { RoomRes } from "../../api/responseTypes";

export default function AllRoomList({ success, setSuccess }) {
  const [rooms, setRooms] = useState<RoomRes[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await getAllRooms();
      setRooms(response.data);
    };

    fetchRooms();
  }, [success]);

  const handleDelete = async (room_number: string) => {
    deleteRoom(room_number).then((response) => {
      setSuccess(`Successfully deleted Room ${response.data.room_number}`);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold">All Rooms</h2>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        {rooms && rooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
                />
              </svg>
            </div>
            <p className="text-gray-500">There are no rooms</p>
          </div>
        ) : (
          <div className="space-y-4">
            {rooms?.map((room) => (
              <RoomTile
                key={room.room_number}
                admin={true}
                room={room}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
