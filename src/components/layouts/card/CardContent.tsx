import {
  BoxProps,
  Box,
  Heading,
  Text,
  TextProps,
  HeadingProps,
  Flex,
} from "@chakra-ui/react";

export interface CardContentProps extends BoxProps {
  title?: string;
  titleProps?: HeadingProps;
  subtitle?: string;
  subtitleProps?: TextProps;
  footer?: React.ReactNode;
  footerProps?: BoxProps;
  isLoading?: boolean;
}

export const CardContent: React.FC<CardContentProps> = ({
  title,
  titleProps,
  subtitle,
  subtitleProps,
  footer,
  footerProps,
  isLoading = false,
  children,
  ...props
}) => (
  <Box p={4} {...props}>
    {!isLoading ? (
      <>
        <Flex justifyContent={"space-between"} justifyItems={"flex-start"}>
          <Box>
            {title && (
              <Heading size="md" mb={2} {...titleProps}>
                {title}
              </Heading>
            )}
            {subtitle && (
              <Text fontSize="sm" color="gray.500" mb={2} {...subtitleProps}>
                {subtitle}
              </Text>
            )}
          </Box>
          {children}
        </Flex>
        {footer && (
          <Box mt={4} {...footerProps}>
            {footer}
          </Box>
        )}
      </>
    ) : (
      <Text>Loading content...</Text>
    )}
  </Box>
);
