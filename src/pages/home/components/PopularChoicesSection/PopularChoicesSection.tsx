import { Box, Heading } from "@chakra-ui/react";
import { fetchEnhancedHotels } from "api/fetchData";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { EnhancedHotel } from "types/enhancedData";
import { getTopHotels } from "utils/getTopHotels";
import Carousel from "components/widgets/Carousel/Carousel";
import HotelCard from "components/elements/Card/HotelCard";

// const PopularChoiceSection = () => {
//   const [hotels, setHotels] = useState<EnhancedHotel[]>([]);
//   const history = useHistory();

//   useEffect(() => {
//     const loadHotels = async () => {
//       try {
//         const fetchedHotels = await fetchEnhancedHotels();
//         setHotels(fetchedHotels);
//       } catch (error) {
//         console.error("Failed to fetch hotels:", error);
//       }
//     };

//     loadHotels();
//   }, []);

//   const topHotels = getTopHotels({ hotels, top: 8 });

//   const handleClick = (hotelId: string) => {
//     history.push(`/hotel?id=${hotelId}`);
//   };

//   const cardWidth = 300;

//   const hotelCards = topHotels.map((hotel) => (
//     <HotelCard
//       key={hotel.hotelId}
//       hotel={hotel}
//       handleClick={() => handleClick(hotel.hotelId)}
//       cardProps={{
//         width: { base: "100%", md: `${cardWidth}px` },
//       }}
//       imageProps={{
//         src: hotel.images[0],
//         h: { base: "140px", md: "280px" },
//         overlayProps: { bg: "rgba(255, 255, 255, 0.8)", color: "black" },
//       }}
//       wrapperProps={{
//         width: { md: "100%" },
//         _hover: { transform: "scale(1.05)"},
//         height: { base: "auto", md: "400px" },
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//       }}
//     />
//   ));

//   return (
//     <Box id="popular-choices" pt={10}>
//       <Heading size="lg" mb={6} textAlign="center">
//         Popular Choices
//       </Heading>

//       <Carousel items={hotelCards} itemsPerPage={1} cardWidth={cardWidth} />
//     </Box>
//   );
// };

const PopularChoiceSection = () => <></>
export default PopularChoiceSection;
