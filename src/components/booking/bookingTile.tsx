import type { BookingRes } from "../../api/responseTypes";
import type { Dayjs } from "dayjs";
import { useState } from "react";
import dayjs from "dayjs";
import { deleteBooking, updateBooking } from "../../api/bookings";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { isAxiosError } from "axios";

export default function BookingTile({
  booking,
  setSuccess,
  request = false,
}: {
  booking: BookingRes;
  setSuccess: (set: string) => void;
  request?: boolean;
}) {
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Date picker states - initialize with current booking times
  const [startTime, setStartTime] = useState<Dayjs | null>(
    dayjs(booking.start_time)
  );
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(booking.end_time));
  const [updateError, setUpdateError] = useState<string>("");

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

    setUpdateError("");
    const times = {
      start_datetime: startTime.format(),
      end_datetime: endTime.format(),
    };
    try {
      await updateBooking(booking.id, times);
      setSuccess(`Successfully updated booking with id ${booking.id}`);
      setEditing(false);
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 400) {
        setUpdateError(error.response.data.detail);
      } else {
        setUpdateError("An unexpected error occurred while updating");
      }
    }
  };

  const handleCancel = () => {
    // Reset times to original booking times
    setStartTime(dayjs(booking.start_time));
    setEndTime(dayjs(booking.end_time));
    setUpdateError("");
    setEditing(false);
  };

  return (
    <div className="border rounded p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold">Room {booking.room_number}</h3>
          <div className="text-sm text-gray-600">
            {dayjs(booking.start_time).format("MMM D, h:mm A")} -{" "}
            {dayjs(booking.end_time).format("h:mm A")}
          </div>
        </div>

        <div className="flex gap-2">
          {!editing && !request && (
            <button
              onClick={() => setEditing(true)}
              className="text-blue-600 text-sm px-2 py-1 hover:bg-blue-50 rounded"
            >
              Edit
            </button>
          )}
          {deleting && (
            <button
              onClick={() => setDeleting(false)}
              className="text-blue-600 text-sm px-2 py-1 hover:bg-blue-50 rounded"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleDelete}
            className={`text-sm px-2 py-1 rounded ${
              deleting
                ? "bg-red-600 text-white hover:bg-red-700"
                : "text-red-600 hover:bg-red-50"
            }`}
          >
            {deleting ? "Confirm" : "Delete"}
          </button>
        </div>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="pt-4 border-t -mx-4 px-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <DateTimePicker
              label="Start time"
              value={startTime}
              format="DD/MM/YYYY HH:mm"
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
              format="DD/MM/YYYY HH:mm"
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
            <p className="text-red-600 text-sm mb-4">{updateError}</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {"Save"}
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 px-3 py-1 text-sm hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
