import { useEffect, useState } from "react";
import type { GetBookingsRes } from "../../api/responseTypes";
import { getBookingRequests } from "../../api/bookings";
import RequestTile from "./requestTile";

export default function RequestList({
  success,
  setSuccess,
}: {
  success?: string;
  setSuccess: (value: string) => void;
}) {
  const [requests, setRequests] = useState<GetBookingsRes>();

  useEffect(() => {
    const fetchBookingRequests = async () => {
      const response = await getBookingRequests();
      setRequests(response.data);
    };

    fetchBookingRequests();
  }, [success]);

  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-2xl font-bold">Requests to approve</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {!requests || requests.length === 0 ? (
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
            <p className="text-gray-500">
              You have no booking requests to approve
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <RequestTile
                request={request}
                setSuccess={setSuccess}
                key={request.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
