import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  List,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PlacementWithLogical,
  Text,
} from "@chakra-ui/react";
import ElementEffect from "components/shared/effect/ElementEffect";
import { headerNavDummy } from "data/common.dummy";
import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { HeaderNav } from "types/common";
import { handleScrollToTop } from "utils/common";
import { UserContext } from "context/UserContext";
import UserMenu from "components/elements/UserMenu";
import MenuItems from "components/elements/MenuItems";
import { deleteCookie } from "utils/cookie";

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const { user, setUser, setLoggedIn } = useContext(UserContext);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("statusemail");
    deleteCookie("email");
    setUser(null);
    setLoggedIn(false);
  };

  const renderMenu = (
    header: HeaderNav,
    index: number,
    placement?: PlacementWithLogical
  ) => {
    const isHighlighted = location.pathname === header.href;

    return header.children ? (
      <Menu
        autoSelect={false}
        key={index}
        offset={[0, 0]}
        placement={placement || "auto"}
      >
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          color="black"
          width="100%"
          p="6px 12px"
          justifyContent="space-between"
          role="group"
        >
          <Link to={header.href}>
            <Box fontSize={20}>
              <MenuItems title={header.title} icon={header.icon} isHighlighted={isHighlighted} />
            </Box>
          </Link>
        </MenuButton>

        <MenuList>
          {header.children.map((child, childIndex) =>
            renderMenu(child, childIndex)
          )}
        </MenuList>
      </Menu>
    ) : (
      <Box role="group" key={index}>
        <MenuItem
          borderColor="google.yellow"
          onClick={handleToggleMenu}
          as={Button}
          color="black"
          justifyContent="flex-start"
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}
        >
          <Link to={header.href}>
            <Box fontSize={20}>
              <MenuItems title={header.title} icon={header.icon} isHighlighted={isHighlighted} />
            </Box>
          </Link>
        </MenuItem>
      </Box>
    );
  };

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      w="full"
      zIndex="30"
      bg="white"
      px={{ base: "2rem", xl: "3rem" }}
      transition="all 0.3s ease-in-out"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        h="5rem"
        w="100%"
        maxW="1300px"
        m="auto"
      >
        <ElementEffect
          motionProps={{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
          }}
          elementType={"h2"}
        >
          <Button p="0" onClick={handleScrollToTop} color="black">
            <Link to="/">
              <Text as="span" color="#152C5B" fontSize={26}>
                Stay
              </Text>
              <Text as="span" color="#06B3C4" fontSize={26}>
                Finder
              </Text>
            </Link>
          </Button>
        </ElementEffect>
        <Box
          display={{ base: "none", lg: "flex" }}
          alignItems="center"
          gap={"2rem"}
        >
          <List
            display={{ base: "none", lg: "flex" }}
            alignItems="center"
            gap={"1rem"}
          >
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
                  <Box fontSize={20}>{renderMenu(nav, index)}</Box>
                </ElementEffect>
              ))}
            </Menu>
          </List>
          <UserMenu user={user} handleLogout={handleLogout}/>
        </Box>

        <Box display={{ base: "block", lg: "none" }}>
          <Menu autoSelect={false} isOpen={isOpen}>
            <MenuButton
              onClick={handleToggleMenu}
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList transition="all 0.1s" zIndex={999}>
              {headerNavDummy.map((nav, index) => renderMenu(nav, index))}
              <UserMenu user={user} handleLogout={handleLogout}/>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}
