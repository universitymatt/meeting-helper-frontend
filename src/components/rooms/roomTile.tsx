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
  const canBook = room.available !== false;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            Room {room.room_number}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{room.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Capacity: {room.capacity} people
          </p>
          {room.allowed_roles.length !== 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Allowed roles: {room.allowed_roles.join(", ")}
            </p>
          )}
        </div>
        <div className="ml-4 flex flex-col items-end gap-2">
          {admin && handleDelete && (
            <button
              onClick={() => handleDelete(room.room_number)}
              className={
                "px-4 py-2 rounded-md text-sm font-medium transition bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              }
            >
              Delete
            </button>
          )}
          {onBook && (
            <button
              onClick={() => onBook(room)}
              disabled={!canBook}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                canBook
                  ? room.request_only
                    ? "bg-yellow-600 hover:bg-yellow-700 text-white cursor-pointer"
                    : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {room.available === false
                ? "Unavailable"
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
