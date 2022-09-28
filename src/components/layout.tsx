import { Box, Container } from "@chakra-ui/react";
import CurveBackground from "./CurveBackground";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children, maxWidth = '90rem', bgColor = '#0057FF', isHome = false }) {
	return (
		<Box position="relative">
			<Box width="full" zIndex="-1">
				<CurveBackground fill={bgColor} />
			</Box>
			{isHome && <Box 
				position="absolute" 
				top="0" 
				width="full" 
				height="90rem" 
				zIndex="-2" 
				bgColor="#FFF6EA" />}
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
