import {
	Heading,
	Img,
	Button,
	Text,
	Box,
	Stack,
	Center,
	Flex,
	Spacer,
} from "@chakra-ui/react";

export default function ClubCard() {
	return (
		<>
			<Box
				borderWidth="4"
				borderColor="black"
				borderRadius="20"
				backgroundColor="#FFF6EA"
				h="650"
				w="430"
				p="6"
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
			>
				<Box>
					<Box>
						<Box borderRadius="20" borderWidth="2" borderColor="black">
							<Img
								src="/club_assets/gdsc-uic2/gdsc-uic-cover-photo.png"
								alt="gdsc-uic"
								h="200"
								w="500"
								borderRadius="20"
								objectFit="cover"
							/>
						</Box>

						<Center>
							<Img
								src="/club_assets/gdsc-uic2/logo.png"
								alt="gdsc-logo"
								objectFit="cover"
								h="120"
								mt="-50"
							/>
						</Center>
					</Box>
					<Box textAlign="center">
						<Heading fontSize="1.7rem">Google Developer Students Club</Heading>
						<Text>lorem ipsum dolor sit amet consetectur</Text>
					</Box>
				</Box>

				<Flex flexDirection="column" gap="4">
					<Button
						textColor="white"
						borderRadius="20"
						borderWidth="2"
						p="7"
						borderColor="black"
						backgroundColor="#0057FF"
					>
						Interested
					</Button>
					<Button
						borderRadius="20"
						p="7"
						borderWidth="2"
						borderColor="#0057FF"
						backgroundColor="transparent"
					>
						View Club
					</Button>
				</Flex>
			</Box>
		</>
	);
}
