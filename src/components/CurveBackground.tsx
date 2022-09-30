import { Box } from "@chakra-ui/react";

export default function CurveBackground({ fill = '#0057FF' }: { fill?: string }) {
	return (
		<Box position="absolute" width="full" zIndex="-1">
			<Box bgColor={fill} height="394"></Box>
			<svg viewBox="0 0 1728 282" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 0H1728V282C1034.36 -87.8383 653.359 -87.3248 0 282V0Z" fill={fill} />
			</svg>
		</Box>
	);
}
