import React from "react";
import { Box, Flex, Heading, Text, Image, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);

const teamMembers = [
  {
    name: "Phung Thi Anh",
    position: "CEO",
    photo: "https://img.freepik.com/premium-vector/cute-chibi-girl-wearing-cute-hoodie-vector-style_362642-5212.jpg",
  },
  {
    name: "Luong Phan Tien Nhat",
    position: "COO",
    photo: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/06029c05-347c-4786-b063-de0d5a772f71/01c25527-56c1-49a8-b339-90c6f32f9754.png",
  },
  {
    name: "Phan Ba Hoang",
    position: "CTO",
    photo: "https://img.freepik.com/premium-vector/anime-chibi-boy-character_918868-2015.jpg?semt=ais_hybrid",
  },
  {
    name: "Bui Huu Trong",
    position: "Marketing Lead",
    photo: "https://img.freepik.com/premium-vector/chibi-boy-kid-cute-ai-image-generated_362642-5024.jpg?semt=ais_hybrid",
  },
  {
    name: "Nguyen Tuan Anh",
    position: "Lead",
    photo: "https://i.pinimg.com/564x/2e/4e/c3/2e4ec3a9082e4611b0adf15d07c91f7a.jpg",
  },
];

const TeamSection = () => {
  const cardSize = "260px"; // Uniform card size

  return (
    <Box bgGradient="linear(to-r, blue.50, white)" py={16} px={4}>
      <Box textAlign="center" mb={12}>
        <Heading as="h2" fontSize="4xl" mb={4} color="blue.600">
          Meet the Team
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="800px" mx="auto" mb={8}>
          Our team is a diverse group of experts dedicated to making your travel
          experience exceptional. From customer service to technology, we work
          together to bring you the best platform.
        </Text>
      </Box>

      <Box position="relative" w="full" maxW="900px" mx="auto">
        <Flex flexWrap="wrap" justify="center" gap={6}>
          {teamMembers.map((member) => (
            <MotionVStack
              key={member.name}
              spacing={3}
              align="center"
              p={4}
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              boxShadow="lg"
              whileHover={{ scale: 1.05 }}
              w={cardSize}
              h={cardSize}
              justifyContent="center"
            >
              <Image
                src={member.photo}
                alt={member.name}
                borderRadius="full"
                boxSize="100px"
                objectFit="cover"
                border="3px solid"
                borderColor="blue.400"
              />
              <Text fontWeight="bold" fontSize="lg" color="blue.600">
                {member.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {member.position}
              </Text>
            </MotionVStack>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default TeamSection;
