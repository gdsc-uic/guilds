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
				h="650"
				w="420px"
				p="6"
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
								h="200"
								// w="500"
								borderRadius="20"
								border="2px solid black"
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
								mt="-4rem"
							/>
						</Center>
					</Box>
					<Box textAlign="center" mt="1.5rem">
						<Heading fontSize="1.7rem">Google Developer Students Club</Heading>
						<Text>lorem ipsum dolor sit amet consetectur</Text>
					</Box>
				</Box>

				<Flex
					flexDirection="column"
					gap="4"
					fontFamily="body"
					fontWeight="bold"
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
					>
						View Club
					</Button>
				</Flex>
			</Box>
		</>
	);
}
