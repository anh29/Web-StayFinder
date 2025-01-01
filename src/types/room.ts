import { Hotel } from "./hotel";
import { Review } from "./user";

export type AvailableDate = {
  startDate: string; 
  endDate: string; 
  _id: string;
};

export type Media = string; 

export type Room = {
  _id: string;
  hotel: string;
  roomNumber: string;
  capacity: number;
  price: number;
  roomType: string;
  amenities: string[];
  availableDates: AvailableDate[];
  media: Media[];
  bookDates: string[]; 
  createdAt: string; 
  updatedAt: string; 
  __v: number;
};

export type EnhancedRoom = {
  room: Room;
  hotel: Hotel | string;
  reviews: Review[] | string;
}