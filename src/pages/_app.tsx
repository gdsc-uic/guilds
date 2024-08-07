import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "src/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import "@fontsource/space-grotesk";
import "@fontsource/inter";
import Script from "next/script";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useLenis(({ scroll }) => {
    console.log(scroll);
  });

  return (
    <>

      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.MEASUREMENT_ID}`}
          />
          <Script id="ga-analytics">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
          </Script>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>

    </>
  );
}

export default MyApp;