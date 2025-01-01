import { Box, Button, Image, Flex } from "@chakra-ui/react";
import { API_URL } from "constants/app";
import { FC } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface RoomImageCarouselProps {
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

const RoomImageCarousel: FC<RoomImageCarouselProps> = ({ images, currentIndex, onNext, onPrev }) => {
  // Fallback image when no media is provided
  const fallbackImage = "https://picsum.photos/800/400";

  return (
    <Box position="relative" width="full" height="400px" borderRadius="lg" overflow="hidden">
      <Image
        src={images.length > 0 ? `${API_URL}${images[currentIndex]}` : fallbackImage}
        alt="Room Image"
        borderRadius="lg"
        boxSize="full"
        objectFit="cover"
        filter="brightness(0.7)"
      />
      <Flex position="absolute" top="50%" width="full" justify="space-between" transform="translateY(-50%)">
        <Button
          onClick={onPrev}
          colorScheme="teal"
          size="lg"
          borderRadius="full"
          leftIcon={<FiChevronLeft />}
          isDisabled={images.length <= 1}
        />
        <Button
          onClick={onNext}
          colorScheme="teal"
          size="lg"
          borderRadius="full"
          rightIcon={<FiChevronRight />}
          isDisabled={images.length <= 1}
        />
      </Flex>
    </Box>
  );
};

export default RoomImageCarousel;
