import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
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
  )
}
