import { Box, Container, Text, Center, VStack, HStack } from "@chakra-ui/react";
import Gdsc from "./logos/Gdsc";
import Usg from "./logos/Usg";

export default function Footer() {
	return (
		<Box bg={"#0057FF"} color={"white"} fontFamily="Inter">
			{/* TODO: improve footer */}
			<Container maxW="6xl" py="10">
				<Center>
					<VStack>
						<Box fontWeight="bold" textAlign={"center"}>
							<Text>2022</Text>
							<Text fontSize="32">Club Fair: Guilds</Text>
						</Box>
						<HStack alignItems="center" columnGap="5">
							<Usg />
							<Gdsc />
						</HStack>
						<Box fontSize="15" textAlign={"center"} opacity="60%">
							<Text pt="10">© 2022 GDSC-UIC</Text>
							<Text pt="2">
								Developed by Google Developer Student Clubs - UIC
							</Text>
						</Box>
					</VStack>
				</Center>
			</Container>
		</Box>
	);
}
