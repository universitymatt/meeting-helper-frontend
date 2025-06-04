import { useEffect, useState } from "react";
import type { Role, SignInRes } from "../../api/responseTypes";
import { getAllUsers } from "../../api/users";
import { getAllRoles } from "../../api/roles";
import UserTile from "./userTile";

export default function AllUsersList() {
  const [users, setUsers] = useState<SignInRes[]>();
  const [success, setSuccess] = useState<string>();
  const [allRoles, setAllRoles] = useState<Role[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUsers(response.data);
    };

    const fetchRoles = async () => {
      const response = await getAllRoles();
      setAllRoles(response.data);
    };

    fetchRoles();
    fetchUsers();
  }, [success]);

  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col h-full">
      {/* Header - Fixed */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold">All Users</h2>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {!users ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
                />
              </svg>
            </div>
            <p className="text-gray-500">There are no users</p>
          </div>
        ) : (
          <div className="space-y-4">
            {users?.map((user) => (
              <UserTile
                user={user}
                setSuccess={setSuccess}
                allRoles={allRoles}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
