import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import styled from "@emotion/styled";
import "../styles/globals.css";
import theme from "src/theme";
import "@fontsource/space-grotesk";
import "@fontsource/inter";
import "@fontsource/montserrat";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
