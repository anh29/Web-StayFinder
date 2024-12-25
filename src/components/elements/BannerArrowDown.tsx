import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Icon, IconProps, keyframes } from "@chakra-ui/react";
import { useMemo } from "react";

export interface BannerArrowDownProps {
  arrowCount?: number;
  colors?: string[];
  animationDuration?: number;
  wrapperProps?: BoxProps;
  arrowProps?: IconProps;
}

export default function BannerArrowDown({
  arrowCount = 3,
  colors = ["#FF0000", "#ADD8E6"],
  animationDuration = 5,
  wrapperProps,
  arrowProps,
}: BannerArrowDownProps) {
  const [startColor, endColor] = colors;

  const interpolateColor = (
    start: string,
    end: string,
    factor: number
  ): string => {
    const hexToRgb = (hex: string) =>
      hex
        .replace(/^#/, "")
        .match(/.{2}/g)!
        .map((x) => parseInt(x, 16));

    const [r1, g1, b1] = hexToRgb(start);
    const [r2, g2, b2] = hexToRgb(end);

    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));

    return `rgb(${r}, ${g}, ${b})`;
  };

  const arrowStyles = useMemo(() => {
    return Array.from({ length: arrowCount }).map((_, index) => ({
      color: interpolateColor(startColor, endColor, index / (arrowCount - 1)),
      animationDelay: `${(index * animationDuration) / arrowCount}s`,
    }));
  }, [arrowCount, startColor, endColor, animationDuration]);

  const fadeAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  `;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...wrapperProps}
    >
      {arrowStyles.map((style, index) => (
        <Icon
          as={TriangleDownIcon}
          key={index}
          color={style.color}
          animation={`${fadeAnimation} ${animationDuration}s infinite`}
          opacity={1}
          {...arrowProps}
        />
      ))}
    </Box>
  );
}
