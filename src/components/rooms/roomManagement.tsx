import AllRoomList from "./allRoomList";
import { CreateRoom } from "./createRoom";

export default function RoomManagement({
  success,
  setSuccess,
}: {
  success?: string;
  setSuccess: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  return (
    <div className="flex flex-col gap-6 w-1/3 min-h-0">
      <div className="flex-shrink-0">
        <CreateRoom success={success} setSuccess={setSuccess} />
      </div>
      <div className="flex-1 min-h-0">
        <AllRoomList success={success} setSuccess={setSuccess} />
      </div>
    </div>
  );
}
