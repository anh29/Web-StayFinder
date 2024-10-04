import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import HotelCard from 'components/layouts/HotelCard';
import { useCarousel } from 'hooks/useCarousel';
import { Hotel } from 'types/hotels';
import { getTopHotels } from 'utils/getTopHotels';

const PopularChoiceSection = ({ hotels }: { hotels: Hotel[] }) => {
  const topHotels = getTopHotels({ hotels, top: 8 });
  const { currentIndex, next, prev } = useCarousel(0, 1); // 1 item per page for carousel

  const cardWidth = 300; // Fixed width for each card in pixels
  const hotelCount = topHotels.length;

  return (
    <Box id='popular-choices' pt={20} borderRadius="md" boxShadow="md">
      <Heading size="lg" mb={6} textAlign="center">Popular Choices</Heading>

      {/* Carousel for small screens */}
      <Box overflow="hidden" display={{ base: 'block', sm: 'none' }} position="relative">
        <Flex align="center"> {/* Center the buttons and cards vertically */}
          {/* Navigation buttons */}
          <Button
            onClick={() => prev(hotelCount)}
            variant="solid"
            zIndex={1}
            colorScheme="teal"
            bg="rgb(255 255 255 / 60%)" // Semi-transparent background
            color="black" // Text color
            _hover={{ bg: "rgba(0, 0, 0, 0.8)" }} // Darker on hover
            position={'absolute'}
            left={1}
          >
            &lt;
          </Button>

          <Flex
            transition="transform 0.5s ease"
            transform={`translateX(-${currentIndex * (cardWidth + 16)}px)`} // 16px for margin
            width={`${hotelCount * (cardWidth + 16)}px`} // Set a fixed width for the flex container
          >
            {topHotels.map((hotel) => (
              <Box
                key={hotel.id}
                mx={2} // Space between cards
                width={`${cardWidth}px`} // Fixed width for each card
                flexShrink={0} // Prevent cards from shrinking
              >
                <HotelCard
                  imageUrl={hotel.imageUrl}
                  name={hotel.name}
                  location={hotel.location.address}
                  pricePerNight={hotel.pricePerNight.toString()}
                  starRating={hotel.rating}
                  isFullWidth={true}
                />
              </Box>
            ))}
          </Flex>

          <Button
            onClick={() => next(hotelCount)}
            variant="solid"
            zIndex={1}
            colorScheme="teal"
            bg="rgb(255 255 255 / 60%)" // Semi-transparent background
            color="black" // Text color
            _hover={{ bg: "rgba(0, 0, 0, 0.8)" }} // Darker on hover
            position={'absolute'}
            right={1}
          >
            &gt;
          </Button>
        </Flex>
      </Box>

      {/* Grid layout for larger screens */}
      <Flex
        flexWrap="wrap"
        justifyContent={hotelCount > 0 ? "center" : "flex-start"}
        display={{ base: 'none', sm: 'flex' }} // Hide on small screens
      >
        {topHotels.map((hotel) => (
          <Box
            key={hotel.id}
            m={2}
            width={hotelCount < 3 ? "30%" : `${cardWidth}px`} // Adjust based on hotel count
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            _hover={{ transform: 'scale(1.05)', boxShadow: "2xl" }}
          >
            <HotelCard
              imageUrl={hotel.imageUrl}
              name={hotel.name}
              location={hotel.location.address}
              pricePerNight={hotel.pricePerNight.toString()}
              starRating={hotel.rating}
              isFullWidth={true}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default PopularChoiceSection;
