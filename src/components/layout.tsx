import { Box, Container } from "@chakra-ui/react";
import CurveBackground from "./CurveBackground";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children, maxWidth = '95rem' }) {
	return (
		<Box position="relative">
			<Box width="full" zIndex="-1">
				<CurveBackground />
			</Box>
			<Box>
				<NavBar />
				<Box mx="auto" px={maxWidth !== 'full' ? '1rem' : '0'} maxWidth={maxWidth}>
					{children}
				</Box>
				<Footer />
			</Box>
		</Box>
	);
}
