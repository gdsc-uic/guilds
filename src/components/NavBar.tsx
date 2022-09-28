import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Guilds from "./logos/Guilds";

export default function NavigationBar() {
	return (
		<Flex
			justifyContent={["center", "center", "flex-start"]}
			pl={["0", "0", "3rem"]}
			pt="3rem"
			pb={["1.4rem", "1.4rem", "3rem"]}
		>
			<Link href="/">
				<a>
					<Guilds />
				</a>
			</Link>
		</Flex>
	);
}
