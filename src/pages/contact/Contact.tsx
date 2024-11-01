import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs';
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ContactForm from './components/ContactForm';
import InformationSection from './components/InformationSection';

const MotionButton = motion(Button);

export default function ContactPage() {
  return (
    <Box w="full" mx="auto" py={10} px={4} position="relative">
      {/* Main Container */}
      <Flex direction="column" align="center" mb={12} gap={12}>
        <ContactForm />
        <InformationSection />
      </Flex>

      {/* Social Media Section */}
      <Flex justify="center" mb={8}>
        <Text fontSize="lg" color="gray.700" mr={4}>Follow Us:</Text>
        <Flex gap={4}>
          {[{
            icon: BsFacebook,
            url: "https://facebook.com"
          }, {
            icon: BsTwitter,
            url: "https://twitter.com"
          }, {
            icon: BsInstagram,
            url: "https://instagram.com"
          }].map((social, index) => (
            <MotionButton key={index} as="a" href={social.url} target="_blank" whileHover={{ scale: 1.1 }}>
              <Icon as={social.icon} boxSize={6} color="#06B3C4" />
            </MotionButton>
          ))}
        </Flex>
      </Flex>

      {/* Footer Section */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg="rgba(6, 179, 196, 0.1)"
        py={10}
        px={4}
        rounded="lg"
        textAlign="center"
        boxShadow="lg"
      >
        <Heading as="h2" fontSize="3xl" mb={4} color="#06B3C4">
          Let’s Connect!
        </Heading>
        <Text color="gray.600" maxW="600px" mb={6}>
          We’re just a message away. Reach out to us anytime!
        </Text>
      </Flex>
    </Box>
  );
}
