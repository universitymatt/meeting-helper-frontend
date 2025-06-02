import type { Dayjs } from "dayjs";
import type { FormEvent } from "react";
import React, { useState } from "react";
import { getRooms } from "../api/rooms";
import { NumberBox } from "./textBox";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function BookRoom({ onRoomsFound }) {
  const [minCapacity, setMinCapacity] = useState<number>(0);
  const [start, setStart] = React.useState<Dayjs | null>(null);
  const [end, setEnd] = React.useState<Dayjs | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check if user provided either min capacity OR both start and end times
    if (start && end) {
      try {
        const response = await getRooms({
          min_capacity: minCapacity,
          start_datestr: start.format(),
          end_datestr: end.format(),
        });

        onRoomsFound(response.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.detail);
        } else {
          setError("An unexpected error occurred");
        }
      }
    } else {
      setError("Please fill in at least both start and end time");
    }
    setLoading(false);
  };

  return (
    <div className="flex-shrink-0 w-full p-8 mb-4 bg-white rounded-2xl shadow-xl ring ring-blue-700">
      <h1 className="text-3xl font-bold mb-4">Book a room</h1>
      <form onSubmit={handleSubmit}>
        <NumberBox
          label={"Minimum capacity required"}
          value={minCapacity}
          setValue={setMinCapacity}
        />
        <div className="pb-4">
          <DateTimePicker
            label="Booking start"
            value={start}
            minutesStep={15}
            onChange={(newValue) => setStart(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        </div>
        <div className="pb-4">
          <DateTimePicker
            label="Booking end"
            value={end}
            minutesStep={15}
            onChange={(newValue) => setEnd(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search for rooms"}
        </button>
      </form>
    </div>
  );
}
