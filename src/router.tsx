import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./common";
import Signin from "./routes/Signin";
import Root from "./routes/Root";
import ErrorPage from "./error-page";
import Welcome from "./routes/Welcome";
import UserCreate from "./routes/user/UserCreate";
import AddPerson from "./routes/person/AddPerson";
import ViewPerson from "./routes/person/ViewPerson";

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
        element: <AddPerson />,
      },
      {
        path: ROUTES.VIEWPERSON + ":id?",
        element: <ViewPerson />,
      },

    ],
  },
  {
    path: ROUTES.SIGNIN,
    element: <Signin />,
  },
]);
