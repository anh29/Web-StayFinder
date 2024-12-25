import React, { useState, useEffect, useCallback } from "react";
import { Box, Flex, Heading, Button, Text, Stack } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { getCookie, setCookie } from "utils/cookie";
import { loginUser } from "api/authService";
import { FiUser, FiLock } from "react-icons/fi";
import { InputField } from "components/elements/InputField";
import BackgroundImage from "pages/home/components/BackgroundImageSection";
import CustomToast from "components/elements/CustomToast";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [toast, setToast] = useState<{
    title: string;
    description: string;
    visible: boolean;
    variant: "success" | "error" | "info";
  }>({ title: "", description: "", visible: false, variant: "info" });

  const showToast = (
    title: string,
    description: string,
    variant: "success" | "error" | "info"
  ) => {
    setToast({ title, description, visible: true, variant });
  };

  const hideToast = () =>
    setToast({ title: "", description: "", visible: false, variant: "info" });

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      history.push("/");
    }
  }, [history]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCredentials((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { username, password } = credentials;

      if (!username || !password) {
        showToast("Error", "Please enter both username and password.", "error");
        return;
      }

      setLoading(true);
      try {
        const data = await loginUser({ email: username, password });

        setCookie("token", data.token, 7);
        setCookie("username", username, 7);

        showToast("Login Successful", "Welcome back!", "success");

        setTimeout(() => history.push("/"), 2000);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Invalid username or password.";
        showToast("Login Failed", errorMessage, "error");
      } finally {
        setLoading(false);
      }
    },
    [credentials, history]
  );

  return (
    <Flex align="center" justify="center" bg="gray.50" minH="100vh">
      <BackgroundImage />
      <Box flex="1" bg="white" shadow="lg" borderRadius="lg" p={8}>
        <Heading mb={6} textAlign="center" color="gray.700">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <InputField
              icon={<FiUser color="gray.500" />}
              placeholder="Enter your username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
            />
            <InputField
              icon={<FiLock color="gray.500" />}
              placeholder="Enter your password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
            />
            <Button
              colorScheme="teal"
              type="submit"
              w="full"
              isLoading={loading}
            >
              Login
            </Button>
            <Text fontSize="sm" textAlign="center">
              Don't have an account?{" "}
              <Link to="/register">
                <Text as="span" mx={1} color="teal.500">
                  Register
                </Text>
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>

      {toast.visible && (
        <CustomToast
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={hideToast}
          duration={2000}
        />
      )}
    </Flex>
  );
};

export default LoginPage;
