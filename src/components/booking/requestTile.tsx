import type { BookingRes } from "../../api/responseTypes";
import { useState } from "react";
import dayjs from "dayjs";
import {
  approveBookingRequest,
  declineBookingRequest,
} from "../../api/bookings";

export default function RequestTile({
  request,
  setSuccess,
}: {
  request: BookingRes;
  setSuccess: (set: string) => void;
}) {
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleDelete = () => {
    if (deleting) {
      declineBookingRequest(request.id).then((response) => {
        setSuccess(response.data.message);
      });
    } else {
      setDeleting(true);
    }
  };

  const handleApprove = () => {
    approveBookingRequest(request.id).then((response) => {
      setSuccess(response.data.message);
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header with booking info and action buttons */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Room {request.room_number}
          </h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
            <span>{dayjs(request.start_time).format("MMM D, h:mm A")}</span>
            <span>→</span>
            <span>{dayjs(request.end_time).format("MMM D, h:mm A")}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {deleting && (
            <button
              onClick={() => setDeleting(false)}
              className={
                "px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition"
              }
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleDelete}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
              deleting
                ? "bg-red-600 text-white hover:bg-red-700"
                : "text-red-600 hover:text-red-700 hover:bg-red-50"
            }`}
          >
            {deleting ? "Confirm" : "Decline"}
          </button>
          <button
            onClick={handleApprove}
            className={
              "px-3 py-1.5 text-sm font-medium rounded-md transition text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            }
          >
            {"Approve"}
          </button>
        </div>
      </div>
    </div>
  );
}
