export type SignInRes = {
  access_token: string;
  token_type: string;
};

type room = {
  id: number;
  room_number: string;
  capacity: number;
  description: string;
  available: boolean;
  request_only: boolean;
};

export type GetRoomsRes = {
  available_rooms: [room];
  unavaileble_rooms: [room];
};
