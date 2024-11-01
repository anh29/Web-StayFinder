// CustomToast.tsx
import { Box, Text, CloseButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface CustomToastProps {
  title: string;
  description: string;
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ title, description, onClose }) => {
  return (
    <MotionBox
      bg="teal.500"
      color="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
      position="relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Text fontWeight="bold">{title}</Text>
      <Text>{description}</Text>
      <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} aria-label="Close" />
    </MotionBox>
  );
};

export default CustomToast;
