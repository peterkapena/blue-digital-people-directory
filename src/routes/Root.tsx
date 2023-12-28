import { Outlet } from "react-router-dom";
import { useEffect, } from "react";
import { IS_DEVELOPER, ROUTES, STR_TOKEN } from "../common";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/user-slice";
import useApi, { API_RSRC_LINKS } from "../api/useApi";
import { VerifyTokenOut } from "../api/login";
import { CssVarsProvider, CssBaseline, Box } from "@mui/joy";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Root() {
  const token = sessionStorage.getItem(STR_TOKEN);
  if (!token) window.location.href = ROUTES.SIGNIN;

  const dispatch = useAppDispatch();

  const { isLoading, error, fetchData } = useApi<VerifyTokenOut>(API_RSRC_LINKS.verify_tkn, { triggerOnLoad: false, method: "POST" });

  useEffect(() => {
    const verifyTokenAsync = async () => {
      try {
        const data = await fetchData(null);
        if (data?.token) {
          const {
            email,
            token,
            role
          } = data;

          sessionStorage.setItem(STR_TOKEN, token);
          dispatch(
            setUser({
              user: {
                email,
                role
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
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
          <Sidebar />
          <Header />
          <Box
            component="main"
            className="MainContent"
            sx={{
              pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
              pb: { xs: 2, sm: 2, md: 3 },
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              height: '100dvh',
              gap: 1,
              overflow: 'auto',
              m: 2
            }}
          >

            <Outlet />

          </Box>
        </Box>
      </CssVarsProvider>
    </div>
  );
}


