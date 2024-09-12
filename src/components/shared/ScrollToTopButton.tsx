import { useEffect, useState } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { MdArrowUpward } from "react-icons/md";
import { handleScrollToTop } from "utils/common";

export interface ScrollToTopButtonProps {}

export default function ScrollToTopButton(props: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Button
      onClick={handleScrollToTop}
      width="3rem"
      height="3rem"
      bg="google.blue"
      borderRadius="50%"
      cursor={isVisible ? "pointer" : "default"}
      border="none"
      position="fixed"
      bottom="1rem"
      right="1rem"
      display="flex"
      pointerEvents={isVisible ? "auto" : "none"}
      opacity={isVisible ? 1 : 0}
      alignItems="center"
      justifyContent="center"
      role="group"
      transition="all 0.3s ease-in-out"
      sx={{
        "@keyframes slideIn": {
          "0%": {
            transform: "translateY(10px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
      }}
    >
      <Icon as={MdArrowUpward} color="white" boxSize="1.2em" _groupHover={{ animation: "0.7s ease-in-out 0s 1 slideIn" }} />
    </Button>
  );
}
