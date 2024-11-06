import NavigationMenu from "@/components/navigation-menu";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/city-icon.png" />
      </Head>
      <NavigationMenu />
      <h1>Home</h1>
    </>
  );
}
