import { Box } from "@chakra-ui/react";

export default function Tag({ tagName }: { tagName: string }) {
	return (
		<>
			<Box borderRadius={0} backgroundColor={"pink.600"} p={5}>
				{tagName}
			</Box>
		</>
	);
}
