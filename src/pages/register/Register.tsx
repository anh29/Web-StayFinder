import React, { useState } from "react";
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
import { Link, useHistory } from "react-router-dom"; // Ensure to import useHistory for navigation

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  username: string;
  password: string;
  passwordConfirm: string; // Add confirm password to the interface
}

const RegisterPage: React.FC = () => {
  const toast = useToast();
  const history = useHistory(); // Initialize history for navigation
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    password: "",
    passwordConfirm: "", // Initialize confirm password
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Form validation
    if (Object.values(formValues).some((val) => !val)) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (formValues.password !== formValues.passwordConfirm) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Registration Successful",
        description: "Welcome to StayFinder!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      history.push("/login"); // Redirect to login page on success
    }, 2000);
  };

  return (
    <Flex align="center" justify="center" bg="gray.50">
      {/* Left Side with Background Image */}
      <Box flex="1" display={{ base: "none", md: "block" }} position="relative">
        <Image
          src="https://img1.wsimg.com/isteam/ip/61f9aae4-8c96-479a-9c8a-4ce4304ab622/Front-exterior-view-of-Ella-Resort.jpg/:/cr=t:0%25,l:22.72%25,w:42.18%25,h:100%25/rs=w:730,h:973,cg:true"
          alt="Background"
          h="calc(100vh + 14rem)"
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

      {/* Right Side - Form Section */}
      <Box flex="1" bg="white" shadow="lg" borderRadius="lg">
        <Heading mt={12} mb={6} textAlign="center" color="gray.700">
          Create Account
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={10} alignItems="center">
            <Stack spacing={4} alignItems="center" w="70%">
              {[
                "name",
                "email",
                "phone",
                "address",
                "username",
                "password",
                "passwordConfirm",
              ].map((field) => (
                <FormControl key={field} isRequired>
                  <FormLabel ml="8px">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </FormLabel>
                  <Input
                    type={field.includes("password") ? "password" : "text"}
                    placeholder={`Enter your ${field}`}
                    name={field}
                    value={formValues[field as keyof FormValues]}
                    onChange={handleChange}
                    _hover={{ borderColor: "teal.400" }}
                    _focus={{
                      borderColor: "teal.600",
                      boxShadow: "0 0 0 1px teal.600",
                    }}
                  />
                </FormControl>
              ))}
            </Stack>
            <Button
              colorScheme="teal"
              type="submit"
              w="70%"
              isLoading={loading}
              _hover={{ bg: "teal.500" }}
            >
              {loading ? <Spinner size="sm" /> : "Register"}
            </Button>
          </Stack>

          <Text
            fontSize="sm"
            color="gray.500"
            mt={4}
            textAlign="center"
            display="flex"
            justifyContent="center"
          >
            By signing up, you agree to our
            <Text as="span" mx={1}>
              {" "}
              {/* Adjust margin as needed */}
              <Link to="#">
                <Text color="#319795">terms and conditions</Text>
              </Link>
            </Text>
            .
          </Text>
          <Text
            mt={6}
            mb={12}
            fontSize="sm"
            textAlign="center"
            display="flex"
            justifyContent="center"
          >
            Already have an account?{" "}
            <Link to="/login">
              <Text mx={1} color="#319795">
                Login
              </Text>
            </Link>
          </Text>
        </form>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
