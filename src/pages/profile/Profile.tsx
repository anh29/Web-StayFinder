import React, { useContext } from 'react';
import { Box, Avatar, Text, Heading, Icon, Flex } from '@chakra-ui/react';
import { UserContext } from 'context/UserContext';
import { FaPhone, FaEnvelope, FaUser, FaLock } from 'react-icons/fa';

const UserProfile: React.FC = () => {
  const { user, loggedIn } = useContext(UserContext);

  if (!loggedIn) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="lg" color="teal.700">You are not logged in.</Heading>
      </Box>
    );
  }

  return (
    <Box
      p={6}
      minH="350px"
      alignContent="center"
      bg="white"
      borderRadius="md"
      boxShadow="xl"
      maxW="600px"
      mx="auto"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Flex alignItems="center" mb={6}>
        <Avatar
          name={user?.name}
          src=""
          size="xl"
          bg="teal.500"
          transition="all 0.3s ease"
          _hover={{
            transform: 'rotate(360deg)',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Box ml={4}>
          <Heading size="lg" color="teal.700">{user?.name}</Heading>
          <Text color="gray.600" fontSize="sm">{user?.email}</Text>
        </Box>
      </Flex>

      <Box mt={4} color="gray.700">
        <Box mb={4}>
          <Text fontWeight="bold" fontSize="lg">Phone Number:</Text>
          <Flex alignItems="center">
            <Icon as={FaPhone} color="teal.500" mr={2} />
            <Text>{user?.phonenumber || "Not provided"}</Text>
          </Flex>
        </Box>

        <Box mb={4}>
          <Text fontWeight="bold" fontSize="lg">Role:</Text>
          <Flex alignItems="center">
            <Icon as={FaUser} color="teal.500" mr={2} />
            <Text>{user?.role}</Text>
          </Flex>
        </Box>

        <Box mb={4}>
          <Text fontWeight="bold" fontSize="lg">Email Status:</Text>
          <Flex alignItems="center">
            <Icon as={FaEnvelope} color="teal.500" mr={2} />
            <Text>{user?.statusemail}</Text>
          </Flex>
        </Box>

        <Box mb={4}>
          <Text fontWeight="bold" fontSize="lg">Account Status:</Text>
          <Flex alignItems="center">
            <Icon as={FaLock} color="teal.500" mr={2} />
            <Text>{user?.statusaccount}</Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
