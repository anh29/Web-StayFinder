import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const RenderFooter: React.FC = () => {
  return (
    <>
      <Text fontSize="sm" color="gray.500" mt={4} textAlign="center">
        By signing up, you agree to our
        <Link to="#">
          <Text as="span" color="#319795" mx={1}>
            terms and conditions
          </Text>
        </Link>
        .
      </Text>
      <Text fontSize="sm" mt={6} mb={12} textAlign="center">
        Already have an account? 
        <Link to="/login">
          <Text as="span" color="#319795" mx={1}>
            Login
          </Text>
        </Link>
      </Text>
    </>
  );
};

export default RenderFooter;