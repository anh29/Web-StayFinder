import { Box, Spinner, Text } from "@chakra-ui/react";

interface LoadingErrorStateProps {
  loading: boolean;
  error: string | null;
}

const LoadingErrorState: React.FC<LoadingErrorStateProps> = ({ loading, error }) => {
  if (loading) {
    return (
      <Box pt={20} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box pt={20} textAlign="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return null;
};

export default LoadingErrorState;
