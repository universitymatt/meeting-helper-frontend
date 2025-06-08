import { type Dayjs } from "dayjs";
import type { FormEvent } from "react";
import React, { useState } from "react";
import { getAvailableRooms } from "../../api/rooms";
import { NumberBox } from "../textBox";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function BookRoom({ onRoomsFound }) {
  const [minCapacity, setMinCapacity] = useState<number>(0);
  const [start, setStart] = React.useState<Dayjs | null>(null);
  const [end, setEnd] = React.useState<Dayjs | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Check if user provided at least both start and end times
    if (start && end) {
      try {
        const response = await getAvailableRooms({
          min_capacity: minCapacity,
          start_datetime: start.format(),
          end_datetime: end.format(),
        });

        onRoomsFound(response.data);
      } catch (error) {
        if (error.response && error.response.status === 422) {
          setError(error.response.data.detail[0].msg);
        } else {
          setError("An unexpected error occurred");
        }
      }
    } else {
      setError("Please fill in at least both start and end time");
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Find Available Rooms
        </h2>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="px-6 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
          {/* Capacity Input */}
          <div className="lg:col-span-1">
            <NumberBox
              label="Min. Capacity"
              value={minCapacity}
              setValue={setMinCapacity}
            />
          </div>

          {/* Start Time */}
          <div className="lg:col-span-1">
            <DateTimePicker
              label="Start Time"
              value={start}
              minutesStep={15}
              onChange={(newValue) => setStart(newValue)}
              format="DD/MM/YYYY HH:mm"
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                },
              }}
            />
          </div>

          {/* End Time */}
          <div className="lg:col-span-1">
            <DateTimePicker
              label="End Time"
              value={end}
              format="DD/MM/YYYY HH:mm"
              minutesStep={15}
              onChange={(newValue) => setEnd(newValue)}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                },
              }}
            />
          </div>

          {/* Search Button */}
          <div className="lg:col-span-1">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search Rooms
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-red-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
