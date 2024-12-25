import React, { MouseEventHandler } from "react";
import { ButtonProps, Button } from "@chakra-ui/react";

interface CarouselButtonProps extends ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const CarouselButton: React.FC<CarouselButtonProps> = ({
  children,
  onClick,
  ...rest
}) => (
  <Button
    onClick={onClick}
    variant="solid"
    colorScheme="teal"
    bg="rgba(255, 255, 255, 0.8)"
    color="black"
    _hover={{ bg: "rgba(0, 0, 0, 0.8)", color: "white" }}
    zIndex={1}
    {...rest}
  >
    {children}
  </Button>
);

export default CarouselButton;
