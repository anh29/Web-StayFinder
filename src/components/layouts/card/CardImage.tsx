import { BoxProps, TextProps, Box, Image, Text, useTheme } from "@chakra-ui/react";
import { motion } from "framer-motion";

export interface CardImageProps extends BoxProps {
  src: string;
  alt?: string;
  overlayText?: string;
  overlayProps?: TextProps;
  imageProps?: BoxProps;
  aspectRatio?: number;
  isLoading?: boolean;
  animationProps?: object;
}

const CardImage: React.FC<CardImageProps> = ({
  src,
  alt = "Image",
  overlayText,
  overlayProps,
  imageProps,
  aspectRatio = 16 / 9,
  isLoading = false,
  animationProps = {},
  ...props
}) => {
  const theme = useTheme();

  return (
    <Box
      as={motion.div}
      position="relative"
      overflow="hidden"
      borderRadius="md"
      {...animationProps}
      {...props}
    >
      {!isLoading ? (
        <Image
          src={src}
          alt={alt}
          objectFit="cover"
          w="100%"
          h="100%"
          {...imageProps}
        />
      ) : (
        <Box
          w="100%"
          h="100%"
          bg={theme.colors.gray[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Loading...
        </Box>
      )}
      {overlayText && (
        <Text
          position="absolute"
          bottom={0}
          left={0}
          w="100%"
          bg="rgba(0, 0, 0, 0.6)"
          color="white"
          textAlign="center"
          p={2}
          fontWeight="bold"
          fontSize="lg"
          {...overlayProps}
        >
          {overlayText}
        </Text>
      )}
    </Box>
  );
};

export default CardImage;
