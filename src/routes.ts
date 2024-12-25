import { BasicRoute } from "components/elements/AppRouter";
import Layout from "components/layouts/Layout";
import AboutPage from "pages/about/About";
import ContactPage from "pages/contact/Contact";
import Home from "pages/home/Home";
import HotelDetailPage from "pages/hotels/components/HotelDetail";
import Hotels from "pages/hotels/Hotels";
import LoginPage from "pages/login/Login";
import OrderHistory from "pages/order/OrderHistory";
import UserProfile from "pages/profile/Profile";
import RegisterPage from "pages/register/Register";
import RoomDetailPage from "pages/rooms/components/RoomDetailPage";
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
      {
        path: "/about",
        label: "About Us",
        component: AboutPage,
        exact: true,
      },
      {
        path: "/contact",
        label: "Contact Us",
        component: ContactPage,
        exact: true,
      },
      {
        path: "/register",
        label: "Register",
        component: RegisterPage,
        exact: true,
      },
      {
        path: "/login",
        label: "Login",
        component: LoginPage,
        exact: true,
      },
      {
        path: "/history",
        label: "Order History",
        component: OrderHistory,
        exact: true,
      },
      {
        path: "/profile",
        label: "Profile",
        component: UserProfile,
        exact: true,
      },
    ],
  },
];
