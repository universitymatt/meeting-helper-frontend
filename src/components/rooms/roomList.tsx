import type { GetRoomsReq } from "../../api/requestTypes";
import type { RoomRes } from "../../api/responseTypes";
import RoomTile from "./roomTile";

export default function RoomList({
  rooms,
  filters,
  handleBookRoom,
}: {
  rooms?: RoomRes[];
  filters?: GetRoomsReq;
  handleBookRoom: (room: RoomRes) => void;
}) {
  const parseDate = (datestr: string) => {
    const date = new Date(datestr);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Search Results</h2>
            </div>

            {filters && (
              <div className="text-right">
                <h2 className="text-2xl font-bold mb-2">Active Filters</h2>
                <div className="text-sm text-gray-600 space-y-1">
                  {filters.start_datestr && (
                    <>
                      <div>Start: {parseDate(filters.start_datestr)}</div>
                      <div>End: {parseDate(filters.end_datestr)}</div>
                    </>
                  )}
                  {filters.min_capacity !== 0 && (
                    <div>Minimum capacity: {filters.min_capacity}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
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
              <p className="text-gray-500">
                Search for rooms to see available options
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {rooms?.map((room) => (
                <RoomTile
                  key={room.room_number}
                  room={room}
                  onBook={handleBookRoom}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
