import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { IS_DEVELOPER, ROUTES, STR_TOKEN } from "../common";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/user-slice";
import useApi, { API_RSRC_LINKS } from "../useApi";

interface VerifyTokenOut {
  email: string, token: string, errors: []
}

export default function Root() {
  const [loaded, setLoaded] = useState(false);
  const token = sessionStorage.getItem(STR_TOKEN);

  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useApi<VerifyTokenOut>(API_RSRC_LINKS.login);


  useEffect(() => {
    const verifyTokenAsync = async () => {
      try {
        if (!token) window.location.href = ROUTES.SIGNIN;

        if (IS_DEVELOPER) console.log(data);
        if (data?.token) {
          const {
            email,
            token,
          } = data;

          sessionStorage.setItem(STR_TOKEN, token);

          dispatch(
            setUser({
              user: {
                email,
              },
            })
          );
          setLoaded(!isLoading);

        } else {
          sessionStorage.removeItem(STR_TOKEN);
          window.location.href = ROUTES.SIGNIN;
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyTokenAsync();
  }, [dispatch, token, data, isLoading]);

  if (loaded && !error) return <Home />;
  else
    return (
      <>
        <p>Loading...</p>
      </>
    );
}

export function Home() {
  return (
    <div>
      <Outlet />
    </div>
  );
}


