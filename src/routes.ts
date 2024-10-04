import { BasicRoute } from "components/elements/AppRouter";
import Layout from "components/layouts/Layout";
import Home from "pages/home/Home";
import Hotels from "pages/hotels/Hotels";

export const routes: BasicRoute[] = [
  {
    path: "/",
    component: Layout,
    exact: false,
    routes: [
      { path: "/", label: "Home", component: Home, exact: true },
      {
        path: "/hotels",
        label: "hotels",
        component: Hotels,
        exact: true,
      },
    ],
  },
];
