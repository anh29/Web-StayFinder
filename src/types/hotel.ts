export type Hotel = {
  location: {
    city: string;
    country: string;
    lat: number;
    Lng: number;
  };
  _id: string;
  name: string;
  rating: number;
  owner: string;
  rooms: any[];
  media: string[];
  amenities: string[];
  __v: number;
};

export type HotelFilter = {
  hotel: Hotel;
  roomIds: string[];
  price: number;
}