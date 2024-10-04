import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

interface HotelCardProps {
  imageUrl: string;
  name: string;
  location: string;
  pricePerNight: string;
  starRating?: number; // Optional starRating prop
  isFullWidth?: boolean; // Optional isFullWidth prop
  [key: string]: any; // Capture any additional props
}

const HotelCard: React.FC<HotelCardProps> = ({
  imageUrl,
  name,
  location,
  pricePerNight,
  starRating,
  isFullWidth = false,
  ...otherProps
}) => {
  const imageHeight = otherProps.imageHeight || '200px';

  return (
    <Box
      borderWidth={1}
      borderRadius={8}
      overflow="hidden" // Add overflow hidden for rounded corners
      boxShadow="lg" // Add a shadow effect
      m={2}
      width={isFullWidth ? '100%' : '48%'}
      position="relative"
      transition="transform 0.2s" // Smooth transition for hover effect
      _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }} // Scale and shadow on hover
      {...otherProps}
    >
      <Image src={imageUrl} alt={name} borderRadius={4} h={imageHeight} w="100%" objectFit="cover" />

      {/* Price Box at the top right */}
      <Box
        position="absolute"
        top={2}
        right={2}
        bg="#06B3C4"
        p={2}
        borderRadius={4}
        color="white"
        fontWeight="bold"
      >
        {pricePerNight}
      </Box>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bg="rgba(0, 0, 0, 0.6)"
        p={4}
        borderBottomRadius={4}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="sm" color="white" mb={1}>{name}</Heading>
          {starRating ? (
            <Badge colorScheme="teal" borderRadius="full" px={2}>
              {starRating} ⭐
            </Badge>
          ) : null}
        </Flex>
        <Text color="white" mb={2}>{location}</Text>
      </Box>
    </Box>
  );
};

HotelCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  pricePerNight: PropTypes.string.isRequired,
  starRating: PropTypes.number, // Optional starRating prop type
  isFullWidth: PropTypes.bool, // Optional isFullWidth prop type
};

export default HotelCard;
