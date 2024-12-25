// BookingButton.tsx
import { Button, Flex } from "@chakra-ui/react";
import { FC } from "react";

interface BookingButtonProps {
  onClick: () => void;
}

const BookingButton: FC<BookingButtonProps> = ({ onClick }) => {
  return (
    <Flex justifyContent="center" width="full" mt={6}>
      <Button
        colorScheme="teal"
        size="lg"
        width="full"
        onClick={onClick}
        boxShadow="md"
        _hover={{
          boxShadow: "lg",
          transform: "scale(1.05)",
        }}
      >
        Book This Room
      </Button>
    </Flex>
  );
};

export default BookingButton;
