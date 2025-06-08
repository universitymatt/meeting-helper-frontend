import { useEffect, useState, type FormEvent } from "react";
import { createRoom } from "../../api/rooms";
import { TextBox, NumberBox } from "../textBox";
import Switch from "@mui/material/Switch";
import MultipleSelect from "../multiSelect";
import { getAllRoles } from "../../api/roles";
import type { Role } from "../../api/responseTypes";

export function CreateRoom({
  success,
  setSuccess,
}: {
  success?: string;
  setSuccess: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [description, setDescription] = useState("");
  const [requestOnly, setRequestOnly] = useState(false);
  const [error, setError] = useState("");
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [roomRolesRequired, setRoomRolesRequired] = useState<string[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await getAllRoles();
      setAllRoles(response.data);
    };

    fetchRoles();
  }, [success]);

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
      roles: roomRolesRequired,
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
          setError(error.response.data.detail);
        } else {
          setError("An unexpected error occurred");
        }
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block text-lg font-medium float-left mb-1">
            Allowed Roles
          </label>
          <MultipleSelect
            allRoles={allRoles}
            usersRoles={roomRolesRequired}
            setRoles={setRoomRolesRequired}
            editing={true}
          />
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="requestOnly"
            className="text-sm font-medium text-gray-700"
          >
            Bookable by request only
          </label>
          <Switch
            id="requestOnly"
            checked={requestOnly}
            onChange={() => setRequestOnly(!requestOnly)}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Create Room
        </button>
      </form>
    </div>
  );
}
