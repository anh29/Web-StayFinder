import React from "react";
import { Box, Text } from "@chakra-ui/react";
import QRCode from "react-qr-code";

interface QRCodeSectionProps {
  paymentLink: string;
  timer: number;
}

const QRCodeSection: React.FC<QRCodeSectionProps> = ({ paymentLink, timer }) => {
  return (
    <Box mt={4} textAlign="center">
      <Text fontSize="lg" mb={4}>Scan to Pay</Text>
      <QRCode value={paymentLink} size={256} />
      <Text mt={2}>Please scan the QR code to complete your payment.</Text>
      <Text mt={4}>Time remaining: {Math.floor(timer / 60)}:{timer % 60}</Text>
    </Box>
  );
};

export default QRCodeSection;
