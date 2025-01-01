export type OrderHistory = {
  success: boolean;
  data: Order[];
};

export type Order = {
  transactionId: string;
  roomId: Room;
  amount: number;
  paymentMethod: number;
  transactionDate: string; 
  status: string; 
  checkInDate: string; 
  checkOutDate: string; 
  hotelName: string;
  isReview: boolean;
};

type Room = {
  _id: string;
  hotel: Hotel;
};

type Hotel = {
  _id: string;
  name: string;
};
