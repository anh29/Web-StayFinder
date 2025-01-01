import React from "react";
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

const HeroSection = () => {
  return (
    <Flex align="center" justify="center" flexDirection="column" mb={10}>
      <Heading as="h1" fontSize="4xl" textAlign="center" mb={4} color="#06B3C4">
        About Us
      </Heading>
      <Text fontSize="lg" textAlign="center" maxW="700px" color="gray.700" mb={4}>
        Discover more about our mission, vision, and values, and learn why we’re passionate about connecting you with the perfect destinations.
      </Text>
      <MotionButton
        colorScheme="teal"
        as="a"
        href="/"
        size="lg"
        mt={4}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        bg="#0ab3c4"
      >
        Learn More
      </MotionButton>
    </Flex>
  );
};

export default HeroSection;
