import { useState, type FormEvent } from "react";
import { createRoom } from "../api/rooms";
import { TextBox, NumberBox } from "../components/textBox";
import Switch from "@mui/material/Switch";

export function CreateRoom() {
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [description, setDescription] = useState("");
  const [requestOnly, setRequestOnly] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!roomNumber || !capacity) {
      setError("Please fill in room number and capacity.");
      return;
    }

    setError("");
    createRoom({
      room_number: roomNumber,
      capacity: capacity,
      description: description,
      request_only: requestOnly,
    })
      .then((response) => {
        setSuccess(
          `Room with Room number: ${response.data.room_number} Successfully created`
        );
        setRoomNumber("");
        setCapacity(0);
        setDescription("");
        setRequestOnly(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.error("Bad Request:", error.response.data.detail);
          setError("Incorrect username or password");
        } else {
          console.error("Other error:", error);
          setError("An unexpected error occurred");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl ring ring-blue-700">
        <h1 className="text-3xl font-bold mb-4">Create Room</h1>
        <form onSubmit={handleSubmit}>
          <TextBox
            label={"Room Number"}
            value={roomNumber}
            setValue={setRoomNumber}
          />
          <NumberBox
            label={"Room Capacity"}
            value={capacity}
            setValue={setCapacity}
          />
          <TextBox
            label={"Description"}
            value={description}
            setValue={setDescription}
          />
          <div className="mb-3 float-left">
            <label htmlFor={"requestOnly"} className="text-lg font-medium mb-1">
              Bookable by request only
            </label>
            <Switch
              id="requestOnly"
              checked={requestOnly}
              onChange={() => setRequestOnly(!requestOnly)}
            />
          </div>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}
