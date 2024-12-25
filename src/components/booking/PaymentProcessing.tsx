import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface PaymentProcessingProps {
  timer: number;
}

const PaymentProcessing: React.FC<PaymentProcessingProps> = ({ timer }) => {
  return (
    <Box mt={4}>
      <Text fontSize="lg" fontWeight="bold">Processing Payment...</Text>
      <Text>Please wait while we confirm your payment via Momo.</Text>
      <Text mt={4}>Time remaining: {Math.floor(timer / 60)}:{timer % 60}</Text>
    </Box>
  );
};

export default PaymentProcessing;
