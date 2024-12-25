import { Box, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaPlus } from "react-icons/fa";

const MenuItems = ({title, icon, isHighlighted} : {title: string, icon: IconType, isHighlighted: boolean}) => {
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      gap="0.5rem"
      color={isHighlighted ? "google.yellow" : "black"}
      fontWeight={isHighlighted ? "bold" : "normal"}
    >
      <Box
        w="1.5rem"
        h="1.5rem"
        borderRadius="50%"
        bg="black"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb="0.125rem"
        transition="all 0.35s ease-in-out"
        _groupHover={{
          bg: "google.yellow",
        }}
      >
        <Icon
          as={icon || FaPlus}
          w="1rem"
          h="1rem"
          color="white"
          transition="all 0.35s ease-in-out"
          _groupHover={{
            color: "black",
            transform: "rotate(360deg)",
          }}
        />
      </Box>
      <Text
        as="span"
        transition="all 0.35s ease-in-out"
        _groupHover={{
          color: "google.yellow",
          transform: "translateX(0.25rem)",
        }}
      >
        {title}
      </Text>
      <Box
        position="absolute"
        left="calc(50% + 0.25rem)"
        transform="translateX(-50%)"
        bottom="-0.5rem"
        width="0px"
        h="2px"
        bg="google.yellow"
        transition="all 0.2s ease-in-out"
        _groupHover={{
          width: "100%",
        }}
      />
    </Box>
  );
};

export default MenuItems;