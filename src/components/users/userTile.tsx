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
  allRoles: Role[];
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
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Username: {user.username}
          </h3>
          <p className="text-sm text-gray-600 mb-2">Name: {user.name}</p>

          {/* Role Pills */}
          <div className="flex flex-wrap gap-1">
            Roles:
            {user.role_names.map((role) => (
              <span
                key={role}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Role Selector - Only show when editing */}
      {editing && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Update Roles
          </label>
          <MultipleSelect
            allRoles={allRoles}
            setRoles={setUsersRoles}
            usersRoles={usersRoles}
            editing={editing}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        {editing ? (
          <>
            <Button
              variant="outlined"
              onClick={() => setEditing(false)}
              sx={{
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
                "&:focus-visible": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdateRoles}
              disabled={isUnchanged}
              sx={{
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
                "&:focus-visible": {
                  outline: "none",
                  boxShadow: "none",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#e0e0e0",
                  color: "#9e9e9e",
                },
              }}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            onClick={() => setEditing(true)}
            sx={{
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:focus-visible": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Edit Permissions
          </Button>
        )}
      </div>
    </div>
  );
}
