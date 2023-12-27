import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./common";
import Signin from "./routes/Signin";
import Root from "./routes/Root";
import ErrorPage from "./error-page";
import Welcome from "./routes/Welcome";
import UserCreate from "./routes/user/UserCreate";
import Person from "./routes/person/Person";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Welcome />,
      },
      {
        path: ROUTES.USER_CREATE,
        element: <UserCreate />,
      },
      {
        path: ROUTES.PERSON + ":id?",
        element: <Person />,
      },
    ],
  },
  {
    path: ROUTES.SIGNIN,
    element: <Signin />,
  },
]);
