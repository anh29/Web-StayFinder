import { Box, BoxProps } from "@chakra-ui/react";
import { CardContentProps, CardContent } from "components/layouts/card/CardContent";
import CardImage, { CardImageProps } from "components/layouts/card/CardImage";
import { CardLayoutProps, CardLayout } from "components/layouts/card/CardLayout";
import { EnhancedHotel } from "types/enhancedData";

interface HotelCardProps {
  hotel: EnhancedHotel;
  cardProps?: CardLayoutProps;
  imageProps?: CardImageProps;
  contentProps?: CardContentProps;
  handleClick?: () => void;
  wrapperProps?: BoxProps;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  cardProps,
  imageProps,
  contentProps,
  handleClick,
  wrapperProps,
}) => {
  const { name, description, priceRange, rating, images } = hotel;

  return (
    <Box
      position="relative"
      cursor={handleClick ? "pointer" : "default"}
      onClick={handleClick}
      {...wrapperProps}
    >
      <CardLayout {...cardProps}>
        <CardImage overlayText={`${priceRange.min}-${priceRange.max}`} {...imageProps} src={images[0]} />
        <CardContent
          title={name}
          subtitle={description}
          children={`${rating} ⭐`}
          {...contentProps}
        />
      </CardLayout>
    </Box>
  );
};

export default HotelCard;
