import {
	Heading,
	Img,
	Button,
	Text,
	Box,
	Center,
	Flex,
} from "@chakra-ui/react";
import { Club } from "contentlayer/generated";
import Link from "next/link";
import { clubAssetURL } from "src/utils";

export default function ClubCard({ club }: { club: Club }) {
	return (
		<Box
			borderWidth="5px"
			borderColor="black"
			borderRadius="20"
			backgroundColor="#FFF6EA"
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
			minHeight={{ base: "300px", md: "400px" }} // Set minHeight for different screen sizes
			p="4"
			w="100%"
		>
			{/* Cover Photo */}
			{club.assets.cover_photo && (
				<Box
					borderRadius="15"
					backgroundImage={`url(${clubAssetURL(club, 'cover_photo')})`}
					backgroundPosition="center"
					backgroundSize="cover"
					h={{ base: "200px" }} // Adjust height for different screen sizes
				></Box>
			)}

			{/* logo and club info */}
			<Box mt={club.assets.cover_photo ? { base: "-4rem" } : "3rem"}>
				{/* CLUB NAME */}
				<Center>
					<Img
						src={clubAssetURL(club, 'logo')}
						alt={club.name}
						objectFit="cover"
						h="140px"
						borderRadius="50%"
						
					/>
				</Center>
				{/* CLUB DESCRIPTION */}
				<Box textAlign="center" p="6" color="black">
					<Heading fontSize="1.7rem">{club.name}</Heading>
					{club.description.short && (
						<Text opacity="60%" fontWeight="regular">
							{club.description.short}
						</Text>
					)}
				</Box>
			</Box>

			<Flex
				flexDirection="column"
				gap="4"
				p="6"
				fontFamily="body"
				fontWeight="bold"
				flex="1" // Allow Flex to grow and fill available space
			>
				<Button
					as={Link}
					href={club.url}
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
	);
}