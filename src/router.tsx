import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./common";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Root from "./routes/Root";
import ErrorPage from "./error-page";
import Welcome from "./routes/Welcome";
import UserCreate from "./routes/user/UserCreate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Welcome />,
      }, {
        path: ROUTES.USER_CREATE,
        element: <UserCreate />,
      },
    ],
  },
  {
    path: ROUTES.SIGNIN,
    element: <Signin />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
  },
]);
