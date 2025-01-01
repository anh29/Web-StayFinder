import React from "react";
import { Grid, VStack, Heading, Text, Icon } from "@chakra-ui/react";
import { FaLightbulb, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);

const VisionValuesSection = () => {
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10} mb={12}>
      <MotionVStack
        spacing={4}
        textAlign="center"
        p={4}
        border="1px"
        borderColor="gray.200"
        borderRadius="lg"
        boxShadow="md"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Icon as={FaLightbulb} boxSize={8} color="yellow.500" />
        <Heading as="h3" fontSize="2xl">
          Our Vision
        </Heading>
        <Text color="gray.600">
          To be the world’s most trusted travel platform, connecting people to unique places to stay and experience around the globe.
        </Text>
      </MotionVStack>
      <MotionVStack
        spacing={4}
        textAlign="center"
        p={4}
        border="1px"
        borderColor="gray.200"
        borderRadius="lg"
        boxShadow="md"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Icon as={FaCheckCircle} boxSize={8} color="green.500" />
        <Heading as="h3" fontSize="2xl">
          Our Values
        </Heading>
        <Text color="gray.600">
          Integrity, customer satisfaction, innovation, and excellence. We strive to put our customers first and deliver an unmatched experience.
        </Text>
      </MotionVStack>
    </Grid>
  );
};

export default VisionValuesSection;
