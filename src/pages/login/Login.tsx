import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  useToast,
  Image,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { getCookie, setCookie } from "utils/cookie";

const LoginPage: React.FC = () => {
  const toast = useToast();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  useEffect(() => {
    const savedUsername = getCookie("username");
    if (savedUsername) {
      setFormValues((prev) => ({ ...prev, username: savedUsername }));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.username || !formValues.password) {
      toast({
        title: "Error",
        description: "Please enter both username and password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Save username in cookie
      setCookie("username", formValues.username, 7); // Expires in 7 days

      toast({
        title: "Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      history.push("/hotels");
    }, 2000);
  };

  return (
    <Flex align="center" justify="center" bg="gray.50" minH="100vh">
      <Box flex="1" display={{ base: "none", md: "block" }} position="relative">
        <Image
          src="https://img1.wsimg.com/isteam/ip/61f9aae4-8c96-479a-9c8a-4ce4304ab622/Front-exterior-view-of-Ella-Resort.jpg/:/cr=t:0%25,l:22.72%25,w:42.18%25,h:100%25/rs=w:730,h:973,cg:true"
          alt="Background"
          h="100%"
          w="100%"
          objectFit="cover"
          opacity={0.7}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="rgba(255, 255, 255, 0.65)"
          p="24rem 14rem"
          borderRadius="lg"
          textAlign="center"
          boxShadow="lg"
        >
          <Heading size="lg" color="gray.700" fontWeight="bold">
            Stay<span style={{ color: "#38B2AC" }}>Finder</span>
          </Heading>
        </Box>
      </Box>

      <Box flex="1" bg="white" shadow="lg" borderRadius="lg" p={8}>
        <Heading mb={6} textAlign="center" color="gray.700">
          Login
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                _hover={{ borderColor: "teal.400" }}
                _focus={{
                  borderColor: "teal.600",
                  boxShadow: "0 0 0 1px teal.600",
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                _hover={{ borderColor: "teal.400" }}
                _focus={{
                  borderColor: "teal.600",
                  boxShadow: "0 0 0 1px teal.600",
                }}
              />
            </FormControl>

            <Button
              colorScheme="teal"
              type="submit"
              w="full"
              isLoading={loading}
              _hover={{ bg: "teal.500" }}
            >
              {loading ? <Spinner size="sm" /> : "Login"}
            </Button>

            <Text
              fontSize="sm"
              textAlign="center"
              display="flex"
              justifyContent="center"
            >
              Don't have an account?{" "}
              <Link to="/register">
                <Text mx={1} color="#319795">
                  Register
                </Text>
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginPage;
