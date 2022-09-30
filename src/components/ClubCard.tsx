<<<<<<< HEAD
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
		>
			
			{/* Cover Photo */}
			<Box 
				borderTopRadius="15" 
				backgroundImage={`url(${clubAssetURL(club, 'cover_photo')})`}
				backgroundPosition="center"
				backgroundSize="cover"
				h={["250", "250", "200"]}>
			</Box>


			{/* logo and club info */}
			<Box mt={["-15rem", "-4rem"]}>
				<Center>
					<Img
						src={clubAssetURL(club, 'logo')}
						alt="gdsc-logo"
						objectFit="cover"
						h="130"
						borderRadius="50%"
					/>
				</Center>

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
			>
				{(club.org_type === 'non-academic' && club.registration) && <Link href={club.url + '#interested'}>
					<Button
						as="a"
						textColor="white"
						borderRadius="20"
						p="7"
						backgroundColor="#0057FF"
						border="2px solid black"
					>
						Interested
					</Button>
				</Link>}
				<Link href={club.url}>
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
				</Link>
			</Flex>
		</Box>
	);
}
=======
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
		>
			
			{/* Cover Photo */}
			{club.assets.cover_photo && <Box 
				borderTopRadius="15" 
				backgroundImage={`url(${clubAssetURL(club, 'cover_photo')})`}
				backgroundPosition="center"
				backgroundSize="cover"
				h={["250", "250", "200"]}>
			</Box>}


			{/* logo and club info */}
			<Box mt={club.assets.cover_photo ? ["-15rem", "-4rem"] : "3rem"}>
				<Center>
					<Img
						src={clubAssetURL(club, 'logo')}
						alt={club.name}
						objectFit="cover"
						h="130"
						borderRadius="50%"
					/>
				</Center>

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
			>
				{(club.org_type === 'non-academic' && club.registration) && <Link href={club.url + '#interested'}>
					<Button
						as="a"
						textColor="white"
						borderRadius="20"
						p="7"
						backgroundColor="#0057FF"
						border="2px solid black"
					>
						Interested
					</Button>
				</Link>}
				<Link href={club.url}>
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
				</Link>
			</Flex>
		</Box>
	);
}
>>>>>>> 19e1a39489ee3cd1279ed1a4bb5e36a5182fd0c9
