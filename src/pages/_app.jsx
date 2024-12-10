import NavigationMenu from "@/components/navigation-menu";
import Head from "next/head";
import AuthenticationProvider from "@/utils/authenticationProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthenticationProvider>
        <Head>
          <title>Citivora</title>
          <link rel="icon" href="/city-icon.png" />
        </Head>
        <NavigationMenu />
        <Component {...pageProps} />
      </AuthenticationProvider>
    </>
  );
}
