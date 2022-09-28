import {
	Heading,
	Img,
	Button,
	Text,
	Box,
	Center,
	Flex,
} from "@chakra-ui/react";

export default function ClubCard() {
	return (
		<>
			<Box
				borderWidth="5px"
				borderColor="black"
				borderRadius="20"
				backgroundColor="#FFF6EA"
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
			>
				<Box>
					<Box>
						<Box>
							<Img
								src="/club_assets/gdsc-uic2/gdsc-uic-cover-photo.png"
								alt="gdsc-uic"
								h={["250", "250", "200"]}
								// w="500rem"
								borderRadius="15"
								// border="2px solid black"
								objectFit="cover"
							/>
						</Box>

						<Center>
							<Img
								src="/club_assets/gdsc-uic2/logo.png"
								alt="gdsc-logo"
								objectFit="cover"
								h="130"
								borderRadius="50%"
								mt={["-15rem", "-15rem", "-4rem"]}
							/>
						</Center>
					</Box>
					<Box textAlign="center" p="6" color="black">
						<Heading fontSize="1.7rem">Google Developer Students Club</Heading>
						<Text opacity="60%" fontWeight="regular">
							lorem ipsum dolor sit amet consetectur
						</Text>
					</Box>
				</Box>

				<Flex
					flexDirection="column"
					gap="4"
					p="6"
					fontFamily="body"
					fontWeight="bold"
					// mt="1rem"
				>
					<Button
						textColor="white"
						borderRadius="20"
						p="7"
						backgroundColor="#0057FF"
						border="2px solid black"
					>
						Interested
					</Button>
					<Button
						borderRadius="20"
						p="7"
						borderWidth="2px"
						borderColor="#0057FF"
						textColor="#0057FF"
						backgroundColor="transparent"
						// display={["none", "none", "inherit"]}
					>
						View Club
					</Button>
				</Flex>
			</Box>
		</>
	);
}
