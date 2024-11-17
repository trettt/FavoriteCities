import NavigationMenu from "@/components/navigation-menu";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../themes/custom-theme";
import CssBaseline from "@mui/material/CssBaseline";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={customTheme}>
      <CssBaseline />
        <Head>
          <title>Citivora</title>
          <link rel="icon" href="/city-icon.png" />
        </Head>
        <NavigationMenu />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
