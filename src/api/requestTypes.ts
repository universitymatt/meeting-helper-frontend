export interface SignInReq {
  username: string;
  password: string;
}

export interface SignUpReq extends SignInReq {
  name: string;
}

export interface GetRoomsReq {
  min_capacity: number;
  datetime_start: number;
  datetime_end: number;
}
