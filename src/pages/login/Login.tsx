import React, { useState, useCallback, useContext, useEffect } from "react";
import { Box, Flex, Heading, Button, Text, Stack } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { setCookie } from "utils/cookie";
import { loginUser, resetPassword } from "api/authService";
import { FiUser, FiLock } from "react-icons/fi";
import { InputField } from "components/elements/InputField";
import BackgroundImage from "pages/home/components/BackgroundImageSection";
import CustomToast from "components/elements/CustomToast";
import { UserContext } from "context/UserContext";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { setUser, setLoggedIn, loggedIn } = useContext(UserContext);
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

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  const showToast = (
    title: string,
    description: string,
    variant: "success" | "error" | "info"
  ) => {
    setToast({ title, description, visible: true, variant });
  };

  const hideToast = () =>
    setToast({ title: "", description: "", visible: false, variant: "info" });

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
        setCookie("email", data.data.email, 7);
        setCookie("statusemail", data.data.statusemail, 7);
        setUser(data.data);
        setLoggedIn(true);

        showToast("Login Successful", "Welcome back!", "success");

        setTimeout(() => history.push("/"), 1000);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Invalid username or password.";
        showToast("Login Failed", errorMessage, "error");
      } finally {
        setLoading(false);
      }
    },
    [credentials, setUser, setLoggedIn, showToast]
  );

  const handleResetPassword = async () => {
    const { username } = credentials;

    if (!username) {
      showToast("Error", "Please enter your username to reset password.", "error");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ email: username });
      showToast("Reset Password", "Password reset link sent to your email.", "success");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to send reset link.";
      showToast("Reset Failed", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

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
            <Button
              variant="link"
              colorScheme="teal"
              onClick={handleResetPassword}
              isLoading={loading}
            >
              Forgot Password?
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
