export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  country: string;
  phonenumber: string;
  role: string;
  statusemail: string;
  statusaccount: string;
};

export type Review = {
  _id: string;
  room: string;
  user: User;
  rating: number;
  comment: string;
  media: string[];
  createdAt: string;
};

export type UserReview = {
  roomId: string;
  rating: number;
  comment: string;
  media?: string[]; // Optional media field
  createdAt?: string; // Optional createdAt field
};