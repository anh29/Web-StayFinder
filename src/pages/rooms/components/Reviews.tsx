import React from "react";
import { Box, Text, VStack, HStack, Icon, Avatar, Flex, Image } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { Review } from "types/user";
import { API_URL } from "constants/app";

interface ReviewsProps {
  reviews: Review[] | string;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  if (typeof reviews === "string") {
    return <Text color="gray.500">{reviews}</Text>;
  }

  const fallbackImage = "https://picsum.photos/800/400"; // Fallback image URL

  return (
    <Box mt={4} p={4}>
      <Text fontSize="2xl" fontWeight="bold" color="gray.800">Customer Reviews</Text>
      <VStack spacing={6} align="stretch" mt={6} maxH="600px" overflowY="auto">
        {reviews.map((review, index) => (
          <Box
            key={index}
            p={6}
            borderWidth={1}
            borderRadius="lg"
            bg="white"
            shadow="lg"
            _hover={{ transform: "scale(1.02)", transition: "0.2s", boxShadow: "lg" }}
          >
            <HStack spacing={4} align="center">
              <Avatar name={`User ${review.user.name.slice(0, 6)}`} size="md" />
              <VStack align="start" spacing={1} flex="1">
                <Text fontWeight="bold" color="gray.700" fontSize="lg">
                  User {review.user.name.slice(0, 6)}
                </Text>
                <Flex align="center">
                  <HStack spacing={1}>
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        as={FaStar}
                        color={i < review.rating ? "yellow.400" : "gray.300"}
                        boxSize={5}
                      />
                    ))}
                  </HStack>
                </Flex>
              </VStack>
              <Text fontSize="sm" color="gray.500">{new Date(review.createdAt).toLocaleDateString()}</Text>
            </HStack>

            {/* Display images or fallback */}
            <Box mt={4}>
              {review.media?.length > 0 ? (
                review.media.map((url, idx) => (
                  <Image 
                    key={idx} 
                    src={`${API_URL}${url}`} 
                    alt={`Review Image ${idx + 1}`} 
                    maxHeight="200px" 
                    width="100%" 
                    objectFit="cover" 
                    borderRadius="md" 
                    mb={2} 
                  />
                ))
              ) : (
                <Image 
                  src={fallbackImage} 
                  alt="Fallback Review Image" 
                  maxHeight="200px" 
                  width="100%" 
                  objectFit="cover" 
                  borderRadius="md" 
                />
              )}
            </Box>

            <Text mt={4} fontSize="md" color="gray.600">{review.comment}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Reviews;
