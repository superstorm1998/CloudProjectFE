import LoginPage from "../page/login/login";
import HomePage from "../page/home/home";

export const Routes = [
  {
    component: LoginPage,
    exact: true,
    path: "/"
  },
  {
    component: HomePage,
    path: "/Home"
  }
];
