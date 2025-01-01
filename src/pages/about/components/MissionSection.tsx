import React from "react";
import { Box, Flex, Heading, Text, Icon } from "@chakra-ui/react";
import { FaGlobe } from "react-icons/fa";

const MissionSection = () => {
  return (
    <Box textAlign="center" mb={12}>
      <Flex align="center" justify="center" mb={4}>
        <Icon as={FaGlobe} boxSize={8} color="#06B3C4" />
        <Heading as="h2" fontSize="3xl" mx={2}>
          Our Mission
        </Heading>
      </Flex>
      <Text fontSize="lg" color="gray.600" maxW="800px" mx="auto">
        We believe that everyone deserves a memorable travel experience. Our mission is to make travel easy and accessible by providing a seamless platform to connect travelers with top accommodations around the world.
      </Text>
    </Box>
  );
};

export default MissionSection;
