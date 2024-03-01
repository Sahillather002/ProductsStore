import { ThemeProvider } from "next-themes";
import Head from "next/head";

import "../styles/globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Buy it!</title>
      </Head>
      <ThemeProvider enableSystem={true}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
