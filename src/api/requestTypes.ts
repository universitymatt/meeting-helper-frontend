export interface SignInReq {
  username: string;
  password: string;
}

export interface SignUpReq extends SignInReq {
  name: string;
}

export interface GetRoomsReq {
  start_datetime: string;
  end_datetime: string;
  min_capacity?: number;
}

export interface Times {
  start_datetime: string;
  end_datetime: string;
}

export interface CreateRoomReq {
  room_number: string;
  capacity: number;
  description?: string;
  request_only?: boolean;
  roles: string[];
}

export interface CreateBookingReq {
  room_number: string;
  start_datetime: string;
  end_datetime: string;
}
