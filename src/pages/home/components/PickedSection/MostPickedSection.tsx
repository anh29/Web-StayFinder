import { Box, Flex, Heading } from '@chakra-ui/react';
import HotelCard from 'components/layouts/HotelCard';
import { Hotel } from 'types/hotels';
import { getTopHotels } from 'utils/getTopHotels';

interface MostPickedSectionProps {
  hotels: Hotel[];
}

const MostPickedSection: React.FC<MostPickedSectionProps> = ({ hotels }) => {
  // Get the top 5 hotels based on the criteria defined in getTopHotels function
  const top5Hotels = getTopHotels({ hotels, top: 5 });

  return (
    <Box id='most-picked' pt={20}>
      <Heading size="lg" mb={6} textAlign="center">Most Picked</Heading>
      <Flex flexWrap="wrap" justifyContent="space-between">
        {/* Best hotel displayed in full width */}
        <Box width={{ base: '100%', md: '33%' }} my={1} position="relative">
          <HotelCard
            imageUrl={top5Hotels[0].imageUrl}
            name={top5Hotels[0].name}
            location={top5Hotels[0].location.address}
            pricePerNight={top5Hotels[0].pricePerNight.toString()}
            starRating={top5Hotels[0].rating} // Assuming starRating is available
            isFullWidth={true}
            imageHeight={{ base: '200px', md: '424px' }} // Responsive image height
          />
        </Box>

        {/* Remaining hotels displayed in a flex box */}
        <Box width={{ base: '100%', md: '66%' }} display="flex" flexWrap="wrap" justifyContent="space-between">
          {top5Hotels.slice(1).map((hotel) => (
            <Box
              key={hotel.id}
              p={0}
              m={1} // Margin for spacing between cards
              width={{ base: '100%', sm: '48%' }} // Responsive width
              position="relative"
            >
              <HotelCard
                imageUrl={hotel.imageUrl}
                name={hotel.name}
                location={hotel.location.address}
                pricePerNight={hotel.pricePerNight.toString()}
                starRating={hotel.rating} // Assuming starRating is available
                isFullWidth={true} // Set to false for smaller cards
              />
            </Box>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default MostPickedSection;
