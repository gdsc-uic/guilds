import { Box } from "@chakra-ui/react";
import CurveBackground from "./CurveBackground";
import NavBar from "./NavBar";

export default function Layout({ children }) {
	return (
		<>
			<CurveBackground />
			<Box marginTop="-850">
				<NavBar />
				{children}
			</Box>
		</>
	);
}
