import type { GetBookingsRes } from "../api/responseTypes";
import BookingTile from "./bookingTile";

export default function BookingList({
  bookings,
  setSuccess,
}: {
  bookings?: GetBookingsRes;
  setSuccess: (set: string) => void;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col h-full">
        {/* Header - Fixed */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold">Your Upcoming Bookings</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {bookings && bookings.length === 0 ? (
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
              <p className="text-gray-500">You have no upcoming bookings</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings?.map((booking) => (
                <BookingTile
                  booking={booking}
                  setSuccess={setSuccess}
                  key={booking.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
