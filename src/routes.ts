import { BasicRoute } from "components/elements/AppRouter";
import Layout from "components/layouts/Layout";
import Home from "pages/home/Home";
import HotelDetailPage from "pages/hotels/components/HotelDetail";
import Hotels from "pages/hotels/Hotels";
import RoomDetailPage from "pages/rooms/components/DetailRoom";
import RoomsPage from "pages/rooms/RoomsPage";
import SearchPage from "pages/search/SearchPage";

export const routes: BasicRoute[] = [
  {
    path: "/",
    component: Layout,
    exact: false,
    routes: [
      { path: "/", label: "Home", component: Home, exact: true },
      { path: "/search", label: "Search", component: SearchPage, exact: true },
      {
        path: "/hotels",
        label: "Hotels",
        component: Hotels,
        exact: true,
      },
      {
        path: "/hotel",
        label: "Hotel Detail",
        component: HotelDetailPage,
        exact: true,
      },
      {
        path: "/rooms",
        label: "Rooms",
        component: RoomsPage,
        exact: true,
      },
      {
        path: "/room",
        label: "Detail Room",
        component: RoomDetailPage,
        exact: true,
      },
    ],
  },
];
