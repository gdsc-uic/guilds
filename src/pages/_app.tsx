import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import theme from "src/theme";
import "@fontsource/space-grotesk";
import "@fontsource/inter/700.css";
import "@fontsource/inter/200.css";
import "@fontsource/montserrat/400.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
