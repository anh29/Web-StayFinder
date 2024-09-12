import { Box, theme } from "@chakra-ui/react";
import { gdscIcon } from "assets/images";
import { Row, Col } from "components/elements";
import AppImage from "components/elements/AppImage";
import { DrawerNavigation } from "components/layouts/DrawerNavigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/root-reducer";
import { AppDispatch } from "redux/root-store";
import { showDrawer } from "redux/ui/slice";
import { colors } from "theme";

const BurgerBar = ({
  barWidth,
  hoverWidth,
}: {
  barWidth: number;
  hoverWidth: number;
}) => {
  return (
    <Box
      w={barWidth}
      border="1px solid white"
      transition="all .5s ease"
      _groupHover={{ width: hoverWidth }}
    />
  );
};

const BURGER_BAR_WIDTH = [
  { barWidth: 6, hoverWidth: 10 },
  { barWidth: 8, hoverWidth: 4 },
  { barWidth: 4, hoverWidth: 6 },
];

const Navigation = () => {
  const dispatch: AppDispatch = useDispatch();
  const isShowDrawer =
    useSelector((state: RootState) => state.ui.menu.isShowDrawer) || false;
  const [isAtTop, setIsAtTop] = React.useState(true);

  useEffect(() => {
    window.onscroll = () => {
      setIsAtTop(window.scrollY < 10);
    };
  }, []);

  const handleOpenDrawer = () => {
    dispatch(showDrawer(!isShowDrawer));
  };

  const renderHamburger = () => (
    <Col
      role="group"
      gap="7px"
      cursor="pointer"
      alignItems="flex-end"
      onClick={handleOpenDrawer}
    >
      {BURGER_BAR_WIDTH.map(({ barWidth, hoverWidth }) => (
        <BurgerBar key={barWidth} barWidth={barWidth} hoverWidth={hoverWidth} />
      ))}
    </Col>
  );

  return (
    <Box
      w="100vw"
      position="fixed"
      bg={!isAtTop ? colors.black : "transparent"}
      zIndex={theme.zIndices.docked}
      transition={"all .3s ease-in"}
    >
      <Row
        position="relative"
        py={8}
        px="8rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <AppImage url={gdscIcon} w="50px" alt="gdsc-icon" />
        {renderHamburger()}
        <DrawerNavigation />
      </Row>
    </Box>
  );
};

export default Navigation;
