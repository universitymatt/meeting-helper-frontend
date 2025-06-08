import type { GetBookingsRes } from "../../api/responseTypes";
import BookingTile from "./bookingTile";
import dayjs from "dayjs";

export default function BookingList({
  bookings,
  setSuccess,
}: {
  bookings?: GetBookingsRes;
  setSuccess: (set: string) => void;
}) {
  // Group bookings by day
  const groupBookingsByDay = (bookings: GetBookingsRes) => {
    // Filter out bookings where accepted is false
    const acceptedBookings = bookings.filter(
      (booking) => booking.accepted !== false
    );

    const grouped = acceptedBookings.reduce((acc, booking) => {
      const dayKey = dayjs(booking.start_time).format("YYYY-MM-DD");
      if (!acc[dayKey]) {
        acc[dayKey] = [];
      }
      acc[dayKey].push(booking);
      return acc;
    }, {} as Record<string, typeof acceptedBookings>);

    // Sort days chronologically and sort bookings within each day
    return Object.entries(grouped)
      .sort(([a], [b]) => dayjs(a).diff(dayjs(b)))
      .map(([date, dayBookings]) => ({
        date,
        bookings: dayBookings.sort((a, b) =>
          dayjs(a.start_time).diff(dayjs(b.start_time))
        ),
      }));
  };

  // Get pending requests
  const getPendingRequests = (bookings: GetBookingsRes) => {
    // Filter bookings where accepted is false and sort by start time
    return bookings
      .filter((booking) => booking.accepted === false)
      .sort((a, b) => dayjs(a.start_time).diff(dayjs(b.start_time)));
  };

  const formatDayHeader = (date: string) => {
    const day = dayjs(date);
    const today = dayjs();
    const tomorrow = today.add(1, "day");

    if (day.isSame(today, "day")) {
      return "Today";
    } else if (day.isSame(tomorrow, "day")) {
      return "Tomorrow";
    } else if (day.diff(today, "day") < 7) {
      return day.format("dddd"); // Monday, Tuesday, etc.
    } else {
      return day.format("dddd, MMM D"); // Monday, Dec 25
    }
  };

  const groupedBookings = bookings ? groupBookingsByDay(bookings) : [];
  const pendingRequests = bookings ? getPendingRequests(bookings) : [];

  const hasUpcomingBookings = groupedBookings.length > 0;
  const hasPendingRequests = pendingRequests.length > 0;
  const hasAnyBookings = hasUpcomingBookings || hasPendingRequests;

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold">Your Bookings</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Show everything if there are any bookings/requests */}
          {hasAnyBookings ? (
            <>
              {/* Pending Requests Section */}
              {hasPendingRequests && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Your Pending Requests
                  </h3>
                  <div className="space-y-3">
                    {pendingRequests.map((booking) => (
                      <BookingTile
                        booking={booking}
                        request={true}
                        setSuccess={setSuccess}
                        key={booking.id}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Bookings Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Upcoming Bookings
                </h3>
                {hasUpcomingBookings ? (
                  <div className="space-y-6">
                    {groupedBookings.map(({ date, bookings: dayBookings }) => (
                      <div key={date}>
                        {/* Day Header */}
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-medium text-gray-700">
                            {formatDayHeader(date)}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {dayBookings.length} booking
                            {dayBookings.length !== 1 ? "s" : ""}
                          </span>
                        </div>

                        {/* Bookings for this day */}
                        <div className="space-y-3">
                          {dayBookings.map((booking) => (
                            <BookingTile
                              booking={booking}
                              setSuccess={setSuccess}
                              key={booking.id}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
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
                      You have no upcoming bookings
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
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
                You have no bookings or pending requests
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
