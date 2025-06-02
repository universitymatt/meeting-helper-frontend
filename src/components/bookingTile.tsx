import type { BookingRes } from "../api/responseTypes";
import { useState } from "react";
import { deleteBooking } from "../api/bookings";

export default function BookingTile({
  booking,
  setSuccess,
}: {
  booking: BookingRes;
  setSuccess: (set: string) => void;
}) {
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleDelete = () => {
    if (deleting) {
      deleteBooking(booking.id).then((response) => {
        setSuccess(response.data.message);
        setDeleting(false);
      });
    } else {
      setDeleting(true);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            Room {booking.room_number}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Start: {String(booking.start_time)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            End: {String(booking.end_time)}
          </p>
        </div>
        <div className="ml-4 flex items-end gap-2">
          <button
            onClick={() => setEditing(!editing)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition bg-blue-600 hover:bg-blue-700 text-white cursor-pointer`}
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              deleting
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-600 hover:bg-gray-700"
            } text-white cursor-pointer`}
          >
            {deleting ? "Confirm Delete" : "Remove Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
