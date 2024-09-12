import { BasicRoute } from "components/elements/AppRouter";
import Layout from "components/layouts/Layout";
import Rules from "pages/Rules";
import Home from "pages/home/Home";

export const routes: BasicRoute[] = [
  {
    path: "/",
    component: Layout,
    exact: false,
    routes: [
      { path: "/", label: "Home", component: Home, exact: true },
      {
        path: "/rules",
        label: "rules",
        component: Rules,
        exact: true,
      },
    ],
  },
];
