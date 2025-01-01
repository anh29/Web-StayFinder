import React from "react";
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

const FooterCTASection = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="rgba(6, 179, 196, 0.1)"
      py={10}
      px={4}
      rounded="md"
      textAlign="center"
      boxShadow="lg"
    >
      <Heading as="h2" fontSize="3xl" mb={4} color="#06B3C4">
        Ready to Explore?
      </Heading>
      <Text color="gray.600" maxW="600px" mb={6}>
        Start your journey with us and explore a world of incredible destinations and unique stays.
      </Text>
      <MotionButton
        as="a"
        href="/contact"
        colorScheme="teal"
        size="lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        bg="#0ab3c4"
      >
        Contact Us
      </MotionButton>
    </Flex>
  );
};

export default FooterCTASection;
