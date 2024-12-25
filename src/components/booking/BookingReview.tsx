import React from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  Stack,
  Divider,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { Room } from "types/data";
import { HiOutlineCheckCircle } from "react-icons/hi"; // For icons

interface BookingReviewProps {
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  paymentMethod: string;
  totalPrice: number;
  onBack: () => void;
  onConfirm: () => void;
}

const BookingReview: React.FC<BookingReviewProps> = ({
  room,
  checkInDate,
  checkOutDate,
  totalPrice,
  paymentMethod,
  onBack,
  onConfirm,
}) => {
  return (
    <Box
      p={6}
      boxShadow="lg"
      borderRadius="lg"
      bg="white"
      w="100%"
      maxWidth="lg"
      mx="auto"
      borderWidth={1}
      borderColor="gray.200"
    >
      {/* Header Section */}
      <Text fontSize="3xl" fontWeight="extrabold" color="teal.600" mb={6}>
        Confirm Your Booking
      </Text>

      <Stack>
        {/* Room Details */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
            Room Details
          </Text>
          <Flex direction="column">
            <Text fontSize="md" color="gray.600">
              <strong>Room:</strong> {room.type}
            </Text>
            <Text fontSize="md" color="gray.600">
              <strong>Capacity:</strong> {room.capacity}{" "}
              {room.capacity > 1 ? "guests - 2 beds" : "guest - 1 bed"}
            </Text>
          </Flex>
          <Divider my={3} />
        </Box>

        {/* Dates Section */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
            Stay Dates
          </Text>
          <Flex direction="column">
            <Text fontSize="md" color="gray.600">
              <strong>Check-in Date:</strong> {checkInDate}
            </Text>
            <Text fontSize="md" color="gray.600">
              <strong>Check-out Date:</strong> {checkOutDate}
            </Text>
          </Flex>
          <Divider my={3} />
        </Box>

        {/* Payment Method Section */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
            Payment Method
          </Text>
          <Flex direction="column">
            <Text fontSize="md" color="gray.600">
              <strong>
                {paymentMethod === "deposit"
                  ? "Pay 10% deposit"
                  : "Pay full amount"}
              </strong>
            </Text>
            <Badge colorScheme="teal" variant="outline" fontSize="sm">
              {paymentMethod === "deposit" ? "Deposit" : "Full Payment"}
            </Badge>
          </Flex>
          <Divider my={3} />
        </Box>

        {/* Total Price */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
            Total Price
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="teal.500">
            {totalPrice} 000 VND
          </Text>
        </Box>

        {/* Buttons */}
        <Flex justifyContent="space-between" mt={8}>
          <Button
            variant="outline"
            onClick={onBack}
            colorScheme="teal"
            w="48%"
            _hover={{ bg: "teal.50" }}
            leftIcon={<Icon as={HiOutlineCheckCircle} />}
          >
            Back
          </Button>
          <Button
            colorScheme="teal"
            onClick={onConfirm}
            w="48%"
            _hover={{ bg: "teal.600", color: "white" }}
            _active={{ bg: "teal.700" }}
          >
            <Text fontWeight="bold">Confirm Booking</Text>
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default BookingReview;
