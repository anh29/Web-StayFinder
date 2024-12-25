import React from "react";
import { Box, Text, VStack, HStack, Icon, Avatar, Flex, Image } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { ReviewHash } from "types/data";

interface ReviewsProps {
  reviews: ReviewHash[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <Box mt={8} p={4} >
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
              <Avatar name={`User ${review.userHash.slice(0, 6)}`} size="md" />
              <VStack align="start" spacing={1} flex="1">
                <Text fontWeight="bold" color="gray.700" fontSize="lg">
                  User {review.userHash.slice(0, 6)}
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
              <Text fontSize="sm" color="gray.500">{new Date(review.timestamp).toLocaleDateString()}</Text>
            </HStack>
            
            {/* Display the image if it exists */}
            {review.imgUrl && (
              <Box mt={4}>
                <Image 
                  src={review.imgUrl} 
                  alt="Review Image" 
                  maxHeight="200px" 
                  width="100%" 
                  objectFit="cover" 
                  borderRadius="md" 
                />
              </Box>
            )}

            <Text mt={4} fontSize="md" color="gray.600">{review.content}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Reviews;
