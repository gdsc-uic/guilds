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
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

export default function ClubCard({ club }: { club: Club }) {
	const [isInterested, setIsInterested] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
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
				<Button
					textColor="white"
					borderRadius="20"
					p="7"
					backgroundColor="#0057FF"
					border="2px solid black"
					leftIcon={isHovered ? <AiFillHeart /> : <AiOutlineHeart />}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					_hover={{
						backgroundColor: "blue",
					}}
					onClick={() => setIsInterested(!isInterested)}
				>
					Interested
				</Button>
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
