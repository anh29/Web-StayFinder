import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Button, Stack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { registerUser } from "api/authService";
import { getCookie } from "utils/cookie";
import BackgroundImage from "pages/home/components/BackgroundImageSection";
import RenderFooter from "./RenderFooter";
import RenderInputFields from "./RenderInputFields";
import CustomToast from "components/elements/CustomToast";

const useToast = () => {
  const [toast, setToast] = useState<{
    title: string;
    description: string;
    visible: boolean;
    variant: "success" | "error" | "info" | "warning";
  }>({
    title: "",
    description: "",
    visible: false,
    variant: "info",
  });

  const showToast = (
    title: string,
    description: string,
    variant: "success" | "error" | "info" | "warning"
  ) => {
    setToast({ title, description, visible: true, variant });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  return { toast, showToast, hideToast };
};

export interface FormValues {
  name: string;
  email: string;
  phone: string;
  country: string;
  password: string;
  passwordConfirm: string;
}

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    passwordConfirm: "",
  });

  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      history.push("/");
    }
  }, [history]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, phone, country, password, passwordConfirm } =
      formValues;

    if (
      !name ||
      !email ||
      !phone ||
      !country ||
      !password ||
      !passwordConfirm
    ) {
      showToast("Error", "All fields are required.", "error");
      return;
    }

    if (password !== passwordConfirm) {
      showToast("Error", "Passwords do not match.", "error");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        name,
        email,
        phonenumber: phone,
        country,
        password,
        role: "customer",
      });

      showToast("Registration Successful", "Welcome to StayFinder!", "success");
      setTimeout(() => history.push("/login"), 2000);
    } catch (error: any) {
      showToast(
        "Error",
        error.response?.data?.message || "Something went wrong.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" bg="gray.50" minH="100vh">
      <BackgroundImage />

      <Box flex="1" bg="white" shadow="lg" borderRadius="lg" p={8}>
        <Heading textAlign="center" color="gray.700" mb={6}>
          Create Account
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={6} alignItems="center">
            <RenderInputFields
              handleChange={handleChange}
              formValues={formValues}
            />

            <Button
              colorScheme="teal"
              type="submit"
              isLoading={loading}
              loadingText="Registering..."
              _hover={{ bg: "teal.600" }}
            >
              Register
            </Button>
          </Stack>
        </form>

        <RenderFooter />

        {toast.visible && (
          <CustomToast
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            onClose={hideToast}
            duration={2000}
          />
        )}
      </Box>
    </Flex>
  );
};

export default RegisterPage;
