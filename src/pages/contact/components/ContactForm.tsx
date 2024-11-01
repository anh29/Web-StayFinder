import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  InputGroup,
  InputLeftElement,
  Icon,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const handleSubmit = (e: any) => {
    e.preventDefault();
   
    if (!name || !email || !message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    
    setTimeout(() => {
      toast({
        title: "Message sent.",
        description: "We've received your message and will get back to you soon!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

     
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 500);
  };

  return (
    <Box
      bg="white"
      p={8}
      borderRadius="lg"
      boxShadow="lg"
      width="80%"
    >
      <Heading as="h2" size="lg" mb={4} justifySelf="center">
      ✨ Let’s Connect! ✨
      </Heading>
      <Text mb={6} justifySelf="center">We'd love to hear from you. Please fill out the form below:</Text>
      {error && <Text color="red.500" mb={4}>{error}</Text>}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Your Name</FormLabel>
            <InputGroup>
              <InputLeftElement children={<Icon as={FaUser} color="gray.400" />} />
              <Input
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outline"
                borderColor="gray.300"
                _focus={{ borderColor: 'teal.400' }}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Your Email</FormLabel>
            <InputGroup>
              <InputLeftElement children={<Icon as={FaEnvelope} color="gray.400" />} />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outline"
                borderColor="gray.300"
                _focus={{ borderColor: 'teal.400' }}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Your Phone (optional)</FormLabel>
            <InputGroup>
              <InputLeftElement children={<Icon as={FaPhone} color="gray.400" />} />
              <Input
                placeholder="(123) 456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                variant="outline"
                borderColor="gray.300"
                _focus={{ borderColor: 'teal.400' }}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Your Message</FormLabel>
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outline"
              borderColor="gray.300"
              _focus={{ borderColor: 'teal.400' }}
              height="150px"
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
          🚀 Send Message
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ContactForm;
