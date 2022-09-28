import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Guilds from "./logos/Guilds";

export default function NavigationBar() {
	return (
		<Flex
			justifyContent={["center", "center", "flex-start"]}
			pl={["0", "0", "3rem"]}
			mt={["3rem", "3rem", "1rem"]}
			mb={["1.4rem", "1.4rem", "3rem"]}
		>
			<Link href="/">
				<a>
					<Guilds />
				</a>
			</Link>
		</Flex>
	);
}
