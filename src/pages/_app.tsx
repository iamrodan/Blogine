import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import AuthProvider from "@/contexts/auth-context";
import Header from "@/components/organisms/Header";
import classNames from "classnames";

const queryClient = new QueryClient();

export default function App({ Component, pageProps, router }: AppProps) {
  const shouldDisplayHeader = () => {
    const navbarExcludedRoutes = ["login", "manage"];
    const currentParentRoute = router.pathname.split("/")[1];

    if (navbarExcludedRoutes.includes(currentParentRoute)) return false;

    return true;
  };

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {shouldDisplayHeader() && <Header />}
        <div
          className={classNames({
            "pt-20 px-0 lg:px-20": shouldDisplayHeader(),
          })}
        >
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
}
