import React, { useEffect } from "react";
import { Box, Text, CloseButton } from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";

type ToastVariant = "success" | "error" | "info" | "warning";

const MotionBox = motion(Box);

interface CustomToastProps {
  title: string;
  description?: string;
  onClose: () => void;
  variant?: ToastVariant;
  duration?: number;
  transition?: MotionProps["transition"];
}

const variantStyles: Record<ToastVariant, { bg: string; color: string }> = {
  success: { bg: "green.500", color: "white" },
  error: { bg: "red.500", color: "white" },
  info: { bg: "blue.500", color: "white" },
  warning: { bg: "yellow.500", color: "black" },
};

const CustomToast: React.FC<CustomToastProps> = ({
  title,
  description,
  onClose,
  variant = "info",
  duration = 5000,
  transition = { type: "spring", stiffness: 300, damping: 20 },
}) => {
  const { bg, color } = variantStyles[variant];

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <MotionBox
      bg={bg}
      color={color}
      p={4}
      borderRadius="md"
      boxShadow="lg"
      position={{ base: "absolute", md: "fixed" }}
      top={{ base: "20px", md: "80px" }}
      right={{ base: "16px" }}
      left={{ base: "16px", md: "unset" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={transition}
    >
      <Box mr={8}>
        <Text fontWeight="bold" mb={2}>
          {title}
        </Text>
        {description && <Text mb={2}>{description}</Text>}
      </Box>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={onClose}
        aria-label="Close"
      />
    </MotionBox>
  );
};

export default CustomToast;
