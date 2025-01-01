import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Room } from "types/room";
import BookingForm from "./BookingForm";
import BookingDetails from "./BookingDetails";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room;
}

export const increaseDay = (date: string, days: number): string => {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj.toISOString().split("T")[0];
};

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  room,
}) => {
  const [isReviewing, setIsReviewing] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkInDate: "",
    checkOutDate: "",
    paymentMethod: "",
    roomId: "",
    totalPrice: 0,
    totalDays: 0,
  });

  const handleFormSubmit = (data: any) => {
    const newCheckInDate = increaseDay(data.checkInDate, 1);

    const updatedData = {
      ...data,
      roomId: room._id,
      checkInDate: newCheckInDate,
    };

    setBookingData(updatedData);
    setIsReviewing(true);
  };

  const handleCancelReview = () => {
    setIsReviewing(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
          {isReviewing ? "Review Your Booking" : "Book Your Stay"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          {isReviewing ? (
            <>
              <BookingDetails bookingData={bookingData} onCancel={handleCancelReview} />
            </>
          ) : (
            <BookingForm room={room} onSubmit={handleFormSubmit} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BookingModal;
