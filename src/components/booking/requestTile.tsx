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
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">Room {request.room_number}</h3>
          <p className="text-gray-600">
            Request made: {dayjs(request.datetime_made).format("MMM D, h:mm A")}
          </p>
          <p className="text-gray-600">Username: {request.username}</p>
        </div>
        <div className="flex gap-2">
          {deleting && (
            <button
              onClick={() => setDeleting(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleDelete}
            className={`px-3 py-1 text-sm rounded ${
              deleting
                ? "bg-red-600 text-white hover:bg-red-700"
                : "text-red-600 hover:bg-red-50"
            }`}
          >
            {deleting ? "Confirm" : "Decline"}
          </button>
          <button
            onClick={handleApprove}
            className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded"
          >
            Approve
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-700">
        {dayjs(request.start_time).format("MMM D, h:mm A")} →{" "}
        {dayjs(request.end_time).format("MMM D, h:mm A")}
      </div>
    </div>
  );
}
