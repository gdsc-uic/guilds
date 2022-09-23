import { Box } from "@chakra-ui/react";

export default function CurveBackground() {
	return (
		<Box
			pos="relative"
			bg="#0057ff"
			h="90vh"
			zIndex="-1"
			_after={{
				content: '""',
				w: "100%",
				h: "70%",
				bg: "white",
				pos: "absolute",
				bottom: "0",
				borderTopLeftRadius: "50%",
				borderTopRightRadius: "50%",
			}}
		/>
	);
}
