import { Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: string;
}

const ArticleTitle = ({ children }: Props) => {
  return (
    <Text
      fontSize="32px"
      fontWeight="600"
      pos="relative"
      paddingBottom={5}
      _after={{
        pos: "absolute",
        bottom: "0",
        left: "0",
        width: "80px",
        height: "5px",
        background: "main.200",
        borderRadius: "3px",
        content: '""',
      }}
    >
      {children}
    </Text>
  );
};

export default ArticleTitle;
