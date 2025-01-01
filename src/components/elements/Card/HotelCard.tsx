import { Box, BoxProps } from "@chakra-ui/react";
import {
  CardContentProps,
  CardContent,
} from "components/layouts/card/CardContent";
import CardImage, { CardImageProps } from "components/layouts/card/CardImage";
import {
  CardLayoutProps,
  CardLayout,
} from "components/layouts/card/CardLayout";
import Carousel, { CarouselProps } from "components/widgets/Carousel/Carousel";
import { API_URL } from "constants/app";
import { Hotel } from "types/hotel";

interface HotelCardProps {
  hotel: Hotel;
  cardProps?: CardLayoutProps;
  imageProps?: CardImageProps;
  contentProps?: CardContentProps;
  handleClick?: () => void;
  wrapperProps?: BoxProps;
  isCarouselImage?: boolean;
  carouselProps?: CarouselProps;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  cardProps,
  imageProps,
  contentProps,
  handleClick,
  wrapperProps,
  isCarouselImage = false,
  carouselProps,
}) => {
  const { _id, name, rating = 0, media, location } = hotel;
  const { city = "", country = "" } = location;

  const images =
    media && media.length > 0 ? media.map((image) => `${API_URL}${image}`) : [];

  return (
    <Box
      position="relative"
      cursor={handleClick ? "pointer" : "default"}
      onClick={handleClick}
      {...wrapperProps}
    >
      <CardLayout {...cardProps}>
        {isCarouselImage && images.length > 0 ? (
          <Carousel
            items={images.map((src) => (
              <CardImage key={src} src={src} {...imageProps} />
            ))}
            {...carouselProps}
          />
        ) : (
          <CardImage
            {...imageProps}
            src={images[0] || `https://picsum.photos/800/400?random=${_id}`}
          />
        )}

        {/* Hotel content like name, rating, and location */}
        <CardContent
          title={name}
          children={`${rating} ⭐`}
          subtitle={`${city}, ${country}`}
          {...contentProps}
        />
      </CardLayout>
    </Box>
  );
};

export default HotelCard;
