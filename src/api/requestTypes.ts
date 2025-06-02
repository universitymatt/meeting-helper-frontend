export interface SignInReq {
  username: string;
  password: string;
}

export interface SignUpReq extends SignInReq {
  name: string;
}

export interface GetRoomsReq {
  start_datestr: string;
  end_datestr: string;
  min_capacity?: number;
}

export interface CreateRoomReq {
  room_number: string;
  capacity: number;
  description?: string;
  request_only?: boolean;
}

export interface CreateBookingReq {
  room_number: string;
  times: {
    start_datestr: string;
    end_datestr: string;
  };
}
