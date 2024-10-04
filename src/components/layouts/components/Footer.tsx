import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  Stack,
  Text,
  useBreakpointValue,
  Input,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaPhone } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { handleScrollToTop } from 'utils/common';
import { Link } from 'react-router-dom';

export interface FooterProps {}

export default function Footer(props: FooterProps) {
  const buttonSize = useBreakpointValue({ base: '40px', md: '50px' });

  return (
    <Box
      as="footer"
      w="full"
      bg="gray.800"
      color="white"
      py={{ base: '4rem', md: '3rem' }}
      px={{ base: '1rem', md: '3rem' }}
      boxShadow="md"
    >
      <Stack spacing={8}>

        {/* Logo Section */}
        <Flex justifyContent="center" mb={6}>
          <Button p="0" onClick={handleScrollToTop} color="white">
            <Link to="/">
              <Text as="span" fontSize="28px" fontWeight="bold">
                Stay
              </Text>
              <Text as="span" fontSize="28px" fontWeight="bold" color="#06B3C4">
                Finder
              </Text>
            </Link>
          </Button>
        </Flex>

        {/* Main Content */}
        <Stack direction={{ base: 'column', md: 'row' }} spacing={8} justifyContent="space-between">
          
          {/* Social Media Section */}
          <Box textAlign="center">
            <Heading as="h4" fontSize="1.5rem" fontWeight="bold" mb={4}>
              Theo dõi chúng tôi
            </Heading>
            <Flex justifyContent="center" gap="1.5rem" mb={4}>
              <Icon as={FaFacebook} w="2.5rem" h="2.5rem" _hover={{ color: 'facebook.400' }} />
              <Icon as={FaInstagram} w="2.5rem" h="2.5rem" _hover={{ color: 'pink.400' }} />
              <Icon as={FaLinkedin} w="2.5rem" h="2.5rem" _hover={{ color: 'linkedin.400' }} />
              <Icon as={FaGlobe} w="2.5rem" h="2.5rem" _hover={{ color: 'blue.400' }} />
            </Flex>
          </Box>

          {/* Call to Action Section */}
          <Box textAlign={{ base: 'center', md: 'left' }}>
            <Heading as="h4" fontSize="1.5rem" fontWeight="bold" mb={2}>
              Đăng ký nhận tin
            </Heading>
            <Text mb={4}>Nhận thông tin cập nhật và ưu đãi đặc biệt.</Text>
            <Flex justifyContent={{ base: 'center', md: 'flex-start' }}>
              <Input
                type="email"
                placeholder="Email của bạn"
                size="md"
                borderColor="gray.600"
                _focus={{ borderColor: 'teal.400' }}
                mr={2}
                width={{ base: '100%', md: '250px' }}
              />
              <Button colorScheme="teal" variant="solid">Đăng ký</Button>
            </Flex>
          </Box>

          {/* Contact Section */}
          <Box textAlign={{ base: 'center', md: 'left' }}>
            <Heading as="h4" fontSize="1.5rem" fontWeight="bold" mb={4}>
              Liên hệ
            </Heading>
            <List spacing={2}>
              <ListItem display="flex" alignItems="center" justifyContent={{ base: 'center', md: 'flex-start' }}>
                <Icon as={FaPhone} w="2rem" h="2rem" color="gray.300" />
                <Text ml={2}>
                  Phùng Thị Ánh: 0123 456 789
                </Text>
              </ListItem>
              <ListItem display="flex" alignItems="center" justifyContent={{ base: 'center', md: 'flex-start' }}>
                <Icon as={IoMdMail} w="2rem" h="2rem" color="gray.300" />
                <Text ml={2}>
                  partnership.stayfinder@gmail.com
                </Text>
              </ListItem>
            </List>
          </Box>
        </Stack>

        {/* Copyright Section */}
        <Box textAlign="center" mt={8}>
          <Text fontSize="sm">© {new Date().getFullYear()} StayFinder. All rights reserved.</Text>
        </Box>
      </Stack>
    </Box>
  );
}
