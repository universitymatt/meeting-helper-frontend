import { useState } from "react";
import { Button } from "@mui/material";
import type { Role, SignInRes } from "../../api/responseTypes";
import MultipleSelect from "../multiSelect";
import { putUsersRoles } from "../../api/users";

export default function UserTile({
  user,
  setSuccess,
  allRoles,
}: {
  user: SignInRes;
  setSuccess: (success: string) => void;
  allRoles?: Role[];
}) {
  const [usersRoles, setUsersRoles] = useState<string[]>(user.role_names);
  const [editing, setEditing] = useState<boolean>(false);

  function arraysEqual(arr1: string[], arr2: string[]) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  }

  const handleUpdateRoles = async () => {
    if (editing) {
      if (!arraysEqual(usersRoles, user.role_names)) {
        putUsersRoles(usersRoles, user.username).then((response) => {
          setSuccess(response.data.message);
        });
      }
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const isUnchanged = arraysEqual(usersRoles, user.role_names);

  return (
    <div className="p-4 border rounded shadow-sm">
      <h3 className="font-semibold">Username: {user.username}</h3>
      <p className="text-sm text-gray-600 mb-2">Name: {user.name}</p>

      <div className="mb-4">
        <span className="text-sm">Roles: </span>
        {user.role_names.map((role) => (
          <span
            key={role}
            className="inline-block px-2 py-1 mr-1 text-xs bg-blue-100 rounded"
          >
            {role}
          </span>
        ))}
      </div>

      {editing && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Update Roles</label>
          <MultipleSelect
            allRoles={allRoles}
            setRoles={setUsersRoles}
            usersRoles={usersRoles}
            editing={editing}
          />
        </div>
      )}

      <div className="flex justify-end gap-2">
        {editing ? (
          <>
            <Button variant="outlined" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdateRoles}
              disabled={isUnchanged}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={() => setEditing(true)}>
            Edit Permissions
          </Button>
        )}
      </div>
    </div>
  );
}
