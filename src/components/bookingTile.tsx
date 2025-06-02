import type { BookingRes } from "../api/responseTypes";
import type { Dayjs } from "dayjs";
import { useState } from "react";
import dayjs from "dayjs";
import { deleteBooking } from "../api/bookings";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function BookingTile({
  booking,
  setSuccess,
}: {
  booking: BookingRes;
  setSuccess: (set: string) => void;
}) {
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Date picker states - initialize with current booking times
  const [startTime, setStartTime] = useState<Dayjs | null>(
    dayjs(booking.start_time)
  );
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(booking.end_time));
  const [updateError, setUpdateError] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);

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

  const handleUpdate = async () => {
    if (!startTime || !endTime) {
      setUpdateError("Please select both start and end times");
      return;
    }

    setUpdating(true);
    setUpdateError("");

    try {
      // TODO: Replace with actual update booking API call
      // const response = await updateBooking(booking.id, {
      //   start_time: startTime.format(),
      //   end_time: endTime.format(),
      // });

      // Placeholder success message
      setSuccess("Booking updated successfully");
      setEditing(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setUpdateError(error.response.data.detail);
      } else {
        setUpdateError("An unexpected error occurred while updating");
      }
    }

    setUpdating(false);
  };

  const handleCancel = () => {
    // Reset times to original booking times
    setStartTime(dayjs(booking.start_time));
    setEndTime(dayjs(booking.end_time));
    setUpdateError("");
    setEditing(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header with booking info and action buttons */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Room {booking.room_number}
          </h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
            <span>{dayjs(booking.start_time).format("MMM D, h:mm A")}</span>
            <span>→</span>
            <span>{dayjs(booking.end_time).format("MMM D, h:mm A")}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!editing && (
            <button
              onClick={() => setEditing(!editing)}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition"
            >
              Edit
            </button>
          )}
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
            {deleting ? "Confirm" : "Delete"}
          </button>
        </div>
      </div>

      {/* Expandable edit form */}
      {editing && (
        <div className="p-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <DateTimePicker
              label="Start time"
              value={startTime}
              minutesStep={15}
              onChange={(newValue) => setStartTime(newValue)}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                },
              }}
            />

            <DateTimePicker
              label="End time"
              value={endTime}
              minutesStep={15}
              onChange={(newValue) => setEndTime(newValue)}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                },
              }}
            />
          </div>

          {updateError && (
            <p className="text-red-600 text-sm mt-3">{updateError}</p>
          )}

          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleUpdate}
              disabled={updating}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-700 px-4 py-2 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
