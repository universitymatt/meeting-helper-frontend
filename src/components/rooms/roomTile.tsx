import type { RoomRes } from "../../api/responseTypes";

export default function RoomTile({
  room,
  admin = false,
  handleDelete,
  onBook,
}: {
  room: RoomRes;
  admin?: boolean;
  handleDelete?: (room_number: string) => Promise<void>;
  onBook?: (room: RoomRes) => void;
}) {
  const canBook = room.available && room.sufficient_roles;

  return (
    <div className="border rounded p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">Room {room.room_number}</h3>
          <p className="text-sm text-gray-600">{room.description}</p>
          <p className="text-sm text-gray-500">Capacity: {room.capacity}</p>

          {/* Status badges */}
          <div className="flex gap-2 mt-2">
            {!room.available && (
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                Unavailable
              </span>
            )}
            {room.request_only && (
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                Request Only
              </span>
            )}
            {room.allowed_roles?.length > 0 && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                Role restricted: {room.allowed_roles.join(", ")}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {admin && handleDelete && (
            <button
              onClick={() => handleDelete(room.room_number)}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              Delete
            </button>
          )}
          {onBook && (
            <button
              onClick={() => onBook(room)}
              disabled={!canBook}
              className={`px-3 py-1 rounded text-sm ${
                canBook
                  ? room.request_only
                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {!room.available
                ? "Unavailable"
                : !room.sufficient_roles
                ? "No Access"
                : room.request_only
                ? "Request"
                : "Book"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
