import { Box } from "@chakra-ui/react";
import CurveBackground from "./CurveBackground";
import NavBar from "./NavBar";

export default function Layout({ children }) {
	return (
		<Box position="relative">
			<Box width="full" zIndex="-1">
				<CurveBackground />
			</Box>
			<Box>
				<NavBar />
				{children}
			</Box>
		</Box>
	);
}
