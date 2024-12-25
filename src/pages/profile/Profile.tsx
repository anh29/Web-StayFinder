import { fetchEnhancedUserById } from 'api/fetchData';
import React, { useEffect, useState } from 'react';
import { EnhancedUser } from 'types/enhancedData';
import {
  Box,
  Avatar,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Image,
  Heading,
  Button,
} from '@chakra-ui/react';

const UserProfile: React.FC<{ userId: string }> = ({ userId = 'u001' }) => {
  const [user, setUser] = useState<EnhancedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const enhancedUser = await fetchEnhancedUserById(userId);
        setUser(enhancedUser);
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" color="#06B3C4" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mb={4}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (!user) {
    return <Text textAlign="center">No user data available.</Text>;
  }

  return (
    <Box p={6} minH='300px' alignContent='center' bg="white" borderRadius="md" boxShadow="lg" maxW="600px" mx="auto">
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar name={user.name} src="" size="xl" bg="#06B3C4" />
        <Box ml={4}>
          <Heading size="lg">{user.name}</Heading>
          <Text color="gray.500">{user.email}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
