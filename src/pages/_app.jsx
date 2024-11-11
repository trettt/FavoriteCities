import NavigationMenu from "@/components/navigation-menu";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Citivora</title>
        <link rel="icon" href="/city-icon.png" />
      </Head>
      <NavigationMenu />
      <Component {...pageProps} />
    </>
  );
}
