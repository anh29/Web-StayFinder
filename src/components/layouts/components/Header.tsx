import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Icon, IconButton, List, Menu, MenuButton, MenuItem, MenuList, PlacementWithLogical, Text } from "@chakra-ui/react";
import ElementEffect from "components/shared/effect/ElementEffect";
import { headerNavDummy } from "data/common.dummy";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HeaderNav } from "types/common";
import { handleScrollToTop } from "utils/common";

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const renderMenuItem = (title: string) => {
    return (
      <Box position="relative" display="flex" alignItems="center" gap="0.5rem">
        <Box
          w="1rem"
          h="1rem"
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
            as={FaPlus}
            w="0.5rem"
            h="0.5rem"
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
        ></Box>
      </Box>
    );
  };

  const renderMenu = (header: HeaderNav, index: number, placement?: PlacementWithLogical) => {
    return header.children ? (
      <Menu autoSelect={false} key={index} offset={[0, 0]} placement={placement || "auto"}>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color="black" width="100%" p="6px 12px" justifyContent="space-between" role="group">
          <Link to={header.href}>{renderMenuItem(header.title)}</Link>
        </MenuButton>

        <MenuList>{header.children.map((child, childIndex) => renderMenu(child, childIndex))}</MenuList>
      </Menu>
    ) : (
      <Box role="group">
        <MenuItem
          borderColor="google.yellow"
          onClick={handleToggleMenu}
          key={index}
          as={Button}
          color="black"
          justifyContent="flex-start"
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}
          _ac
        >
          <Link to={header.href}>{renderMenuItem(header.title)}</Link>
        </MenuItem>
      </Box>
    );
  };
  return (
    <Box as="header" position="fixed" top="0" w="full" zIndex="30" bg="white" px={{ base: "2rem", xl: "3rem" }} transition="all 0.3s ease-in-out">
      <Box display="flex" alignItems="center" justifyContent="space-between" h="5rem" w="100%" maxW="1300px" m="auto">
        <ElementEffect
          motionProps={{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
          }}
          elementType={"h2"}
        >
          <Button p="0" onClick={handleScrollToTop} color="black">
            <Link to="/">Logo StayFinder</Link>
          </Button>
        </ElementEffect>
        <List display={{ base: "none", lg: "flex" }} alignItems="center" gap={"1rem"}>
          <Menu autoSelect={false} isOpen={isOpen}>
            {headerNavDummy.map((nav, index) => (
              <ElementEffect
                key={index}
                motionProps={{
                  initial: { y: "-100%" },
                  animate: { y: 0, transition: { delay: index * 0.1 } },
                }}
                elementType={"li"}
              >
                {renderMenu(nav, index)}
              </ElementEffect>
            ))}
          </Menu>
        </List>

        <Box display={{ base: "block", lg: "none" }}>
          <Menu autoSelect={false} isOpen={isOpen}>
            <MenuButton onClick={handleToggleMenu} as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
            <MenuList transition="all 0.1s" zIndex={999}>
              {headerNavDummy.map((nav, index) => renderMenu(nav, index))}
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}
