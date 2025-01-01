import React, { useState, useEffect } from "react";
import { Box, Flex, BoxProps, ButtonProps } from "@chakra-ui/react";
import CarouselButton from "./CarouselButton";

export interface CarouselProps {
  items?: React.ReactNode[];
  itemsPerPage?: number;
  cardWidth: number;
  spacing?: number;
  wrapperProps?: BoxProps;
  buttonProps?: ButtonProps;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  transitionDuration?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  itemsPerPage = 1,
  cardWidth = 300,
  spacing = 16,
  wrapperProps,
  buttonProps,
  autoPlay = true,
  autoPlayInterval = 3000,
  transitionDuration = "0.3s",
}) => {
  const [clonedItems, setClonedItems] = useState<React.ReactNode[]>([]); 
  const [itemWidth, setItemWidth] = useState<number>(cardWidth); 
  const [startX, setStartX] = useState<number | null>(null); 
  const [currentTranslateX, setCurrentTranslateX] = useState<number>(0); 
  const [swipeDist, setSwipeDist] = useState<number>(0); 
  const [isDragging, setIsDragging] = useState<boolean>(false); 
  const [showArrows, setShowArrows] = useState<boolean>(true); 
  const [localIndex, setLocalIndex] = useState<number>(0); 

  const itemCount = items.length;

  // Adjust item width on window resize
  useEffect(() => {
    const handleResize = () => {
      const containerWidth = window.innerWidth;
      const calculatedItemWidth =
        (containerWidth - (itemsPerPage - 1) * spacing) / itemsPerPage;

      // Set item width to the minimum of calculated width and card width
      setItemWidth(Math.min(calculatedItemWidth, cardWidth)); 
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize); 
  }, [itemsPerPage, spacing, cardWidth]);

  // Clone the items for infinite scroll effect (wrap around)
  useEffect(() => {
    const cloned = [
      ...items.slice(-itemsPerPage), 
      ...items, 
      ...items.slice(0, itemsPerPage), 
    ];
    setClonedItems(cloned); 
  }, [items, itemsPerPage]);

  // Handle the start of the swipe gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    // Get initial X position of the touch
    const touchStartX = e.touches[0].clientX; 
    setStartX(touchStartX); 
    setSwipeDist(0); 
    setIsDragging(true); 
  };

  // Handle the move during swipe gesture
  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX !== null && isDragging) {
      const touchMoveX = e.touches[0].clientX; 
      // Calculate the swipe distance
      const distance = startX - touchMoveX; 
      setSwipeDist(distance);
      setCurrentTranslateX(distance);
    }
  };

  // Handle the end of the swipe gesture
  const handleTouchEnd = () => {
    setIsDragging(false);

    // Determine if the swipe distance is enough to change the index
    // Swipe must be at least half the item width
    const swipeThreshold = itemWidth / 2; 
    if (Math.abs(swipeDist) >= swipeThreshold) {
      if (swipeDist > 0) {
        setLocalIndex((prevIndex) => (prevIndex + 1) % itemCount);
      } else {
        setLocalIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount);
      }
    }

    setSwipeDist(0);
    setCurrentTranslateX(0);
  };

  // Set up autoplay if enabled
  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(() => {
         // Automatically move to the next item
        setLocalIndex((prevIndex) => (prevIndex + 1) % itemCount);
      }, autoPlayInterval);

      return () => clearInterval(intervalId);
    }
  }, [autoPlay, autoPlayInterval, itemCount]);

  // Update translateX when the localIndex changes
  useEffect(() => {
    // Adjust the position based on the current index
    setCurrentTranslateX(localIndex * (itemWidth + spacing)); 
  }, [localIndex, itemWidth, spacing]);

  // Handle previous button click (move to the previous item)
  const handlePrevClick = () => {
    setLocalIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount); 
  };

  // Handle next button click (move to the next item)
  const handleNextClick = () => {
    setLocalIndex((prevIndex) => (prevIndex + 1) % itemCount); 
  };

  return (
    <Box
      position="relative"
      overflow="hidden"
      onMouseEnter={() => setShowArrows(true)} 
      onMouseLeave={() => setShowArrows(false)} 
      {...wrapperProps}
      onTouchStart={handleTouchStart} 
      onTouchMove={handleTouchMove} 
      onTouchEnd={handleTouchEnd} 
    >
      {/* Left Arrow Button */}
      {showArrows && (
        <CarouselButton
          onClick={handlePrevClick} 
          position="absolute"
          left={2}
          top="50%"
          transform="translateY(-50%)"
          {...buttonProps}
        >
          &lt;
        </CarouselButton>
      )}

      {/* Carousel Items */}
      <Flex
        transition={`transform ${transitionDuration}`} 
        transform={`translateX(-${currentTranslateX}px)`} 
        width={`${clonedItems.length * (itemWidth + spacing)}px`} 
      >
        {clonedItems.map((item, index) => (
          <Box
            key={index}
            width={itemWidth}
            mr={index !== clonedItems.length - 1 ? spacing : 0} 
          >
            {item}
          </Box>
        ))}
      </Flex>

      {/* Right Arrow Button */}
      {showArrows && (
        <CarouselButton
          onClick={handleNextClick} 
          position="absolute"
          right={2}
          top="50%"
          transform="translateY(-50%)"
          {...buttonProps}
        >
          &gt;
        </CarouselButton>
      )}
    </Box>
  );
};

export default Carousel;
