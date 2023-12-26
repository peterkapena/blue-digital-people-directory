import { Outlet } from "react-router-dom";
import { useEffect, } from "react";
import { IS_DEVELOPER, ROUTES, STR_TOKEN } from "../common";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/user-slice";
import useApi, { API_RSRC_LINKS } from "../api/useApi";
import { LoginModelOut } from "../api/login";

export default function Root() {
  const token = sessionStorage.getItem(STR_TOKEN);
  if (!token) window.location.href = ROUTES.SIGNIN;

  const dispatch = useAppDispatch();

  const { isLoading, error, fetchData } = useApi<LoginModelOut>(API_RSRC_LINKS.verify_tkn, { triggerOnLoad: false, method: "POST" });

  useEffect(() => {
    const verifyTokenAsync = async () => {
      try {
        const data = await fetchData(null);
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
        } else {
          sessionStorage.removeItem(STR_TOKEN);
          window.location.href = ROUTES.SIGNIN;
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyTokenAsync();
  }, [dispatch]);

  if (!isLoading && !error) return <Home />;
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


