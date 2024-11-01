import React from 'react';
import { Box, Flex, Heading, Text, Image, Grid, VStack, Icon, Button } from '@chakra-ui/react';
import { FaCheckCircle, FaGlobe, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

const AboutPage = () => {
  return (
    <Box w="full" maxW="1300px" mx="auto" py={10} px={4} bg={'white'}>
      {/* Hero Section */}
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
          bg='#0ab3c4'
        >
          Learn More
        </MotionButton>
      </Flex>

      {/* Mission Section */}
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

      {/* Vision & Values Section */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={10} mb={12}>
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

      {/* Meet the Team Section */}
      <Box textAlign="center" mb={12}>
        <Heading as="h2" fontSize="3xl" mb={4}>
          Meet the Team
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="800px" mx="auto" mb={8}>
          Our team is a diverse group of experts dedicated to making your travel experience exceptional. From customer service to technology, we work together to bring you the best platform.
        </Text>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6}>
          {teamMembers.map((member) => (
            <MotionVStack 
              key={member.name} 
              spacing={3} 
              align="center" 
              p={4} 
              border="1px" 
              borderColor="gray.200" 
              borderRadius="md" 
              boxShadow="sm"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Image
                src={member.photo}
                alt={member.name}
                border='1px solid #0ab3c4'
                borderRadius="full"
                boxSize="120px"
                objectFit="cover"
              />
              <Text fontWeight="bold" fontSize="lg">{member.name}</Text>
              <Text fontSize="md" color="gray.500">
                {member.position}
              </Text>
            </MotionVStack>
          ))}
        </Grid>
      </Box>

      {/* Footer CTA Section */}
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
          bg='#0ab3c4'
        >
          Contact Us
        </MotionButton>
      </Flex>
    </Box>
  );
}

// Sample team data
const teamMembers = [
  { name: 'Phung Thi Anh', position: 'CEO', photo: 'https://img.freepik.com/premium-vector/cute-chibi-girl-wearing-cute-hoodie-vector-style_362642-5212.jpg' },
  { name: 'Phan Ba Hoang', position: 'CTO', photo: 'https://img.freepik.com/free-vector/anime-chibi-happy-boy-character_18591-82514.jpg' },
  { name: 'Bui Huu Trong', position: 'Marketing Lead', photo: 'https://img.freepik.com/premium-vector/chibi-boy-kid-cute-ai-image-generated_362642-5024.jpg?semt=ais_hybrid' },
  { name: 'Nguyen Tuan Anh', position: 'Lead', photo: 'https://i.pinimg.com/564x/2e/4e/c3/2e4ec3a9082e4611b0adf15d07c91f7a.jpg' },
];

export default AboutPage
  