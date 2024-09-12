import { Box, Center, Icon } from "@chakra-ui/react";
import { BasicRoute } from "components/elements";
import { AppLink } from "components/elements/AppLink";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "redux/root-reducer";
import { AppDispatch } from "redux/root-store";
import { setShowLoadingScreen, showDrawer } from "redux/ui/slice";
import { routes } from "routes";
import { HiOutlineX } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { drawerItemVars, drawerVars } from "constants/animation";
import { colors } from "theme";

const renderMenuItems = (
  item: BasicRoute,
  parentPath = "",
  itemIdx?: number
): React.ReactNode => {
  if (item.routes) {
    return item.routes.map((route, index) => {
      return renderMenuItems(route, parentPath, index);
    });
  }

  if (item.label) {
    const fullPath =
      parentPath && parentPath !== "/"
        ? `${parentPath}${item.path}`
        : item.path;

    return (
      <motion.div
        key={fullPath}
        variants={drawerItemVars}
        initial="initial"
        animate={{
          ...drawerItemVars.animate,
          transition: {
            duration: 0.1 + itemIdx / 8,
            ease: [0.32, 0, 0.39, 0],
            delay: 0.3,
          },
        }}
        exit={{
          ...drawerItemVars.exit,
          transition: {
            ease: [0.32, 0, 0.39, 0],
            duration: 0.1 + itemIdx / 10,
          },
        }}
      >
        <SingleMenuItem item={item} parentPath={parentPath} />
      </motion.div>
    );
  }

  return null;
};

const SingleMenuItem = ({
  item,
  parentPath = "",
}: {
  item: BasicRoute;
  parentPath: string;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { pathname } = useLocation();
  const fullPath =
    parentPath && parentPath !== "/" ? `${parentPath}${item.path}` : item.path;
  const isActive = pathname.includes(fullPath);

  const handlePressDrawerItem = () => {
    dispatch(setShowLoadingScreen(true));
    dispatch(showDrawer(false));
  };

  if (fullPath !== item.path) {
    return (
      <Box
        key={`menu-${fullPath}`}
        fontWeight="bold"
        my={2}
        _hover={{ cursor: "pointer" }}
        onClick={handlePressDrawerItem}
      >
        <AppLink as={Link} _hover={{ color: "main.700" }}>
          {item.label}
        </AppLink>
      </Box>
    );
  }

  return (
    <Box
      key={`menu-${fullPath}`}
      fontWeight="500"
      _hover={{ cursor: "pointer" }}
      my={5}
      onClick={handlePressDrawerItem}
    >
      <AppLink
        as={Link}
        _focus={{ boxShadow: "none" }}
        to={fullPath}
        color={isActive ? "main.200" : "whiteAlpha.800"}
        _hover={{ color: !isActive ? "whiteAlpha.400" : "main.700" }}
        zIndex={2}
        fontSize="4xl"
        letterSpacing="2px"
      >
        {item.label}
      </AppLink>
    </Box>
  );
};

export const DrawerNavigation = memo(() => {
  const isShowDrawer = useSelector(
    (state: RootState) => state.ui.menu.isShowDrawer
  );
  const dispatch: AppDispatch = useDispatch();
  const handleCloseDrawer = () => {
    dispatch(showDrawer(false));
  };

  return (
    <AnimatePresence>
      {isShowDrawer && (
        <motion.div
          variants={drawerVars}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ position: "fixed", top: 0, right: 0 }}
        >
          <Box width="100vw" height="100vh" bg={colors.black}>
            <Box onClick={handleCloseDrawer} pos="absolute" top={8} right={12}>
              <Icon
                as={HiOutlineX}
                boxSize={8}
                mx={6}
                opacity={0.3}
                transition={"opacity .3s ease"}
                _hover={{ opacity: 0.8 }}
                cursor="pointer"
              />
            </Box>
            <Center width="100%" height="inherit">
              {routes.map((item) => (
                <Box key={item.path}>{renderMenuItems(item)}</Box>
              ))}
            </Center>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
