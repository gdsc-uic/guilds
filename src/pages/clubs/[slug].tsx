import Head from "next/head";
import Layout from "src/components/layout";
import { allClubs, Club } from "contentlayer/generated";
import {
	Box,
	Container,
	Flex,
	Heading,
	Button,
	HStack,
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Img,
	Image,
	VStack,
	Text,
} from "@chakra-ui/react";
import Footer from "src/components/Footer";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { BsPlus } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";
import "swiper/css";
import styled from "@emotion/styled";
import { clubAssetURL } from "src/utils";

export async function getStaticPaths() {
	const paths = allClubs.map((c) => c.url);

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const club = allClubs.find((club) => club._raw.flattenedPath === slug);
	return {
		props: {
			club,
		},
	};
}

export default function ClubPage({ club }: { club: Club }) {
	return (
		<Layout maxWidth="full">
			<Head>
				<title>{club.name}</title>
				<meta name="description" content={club.description?.full ?? ""} />
			</Head>
			<Container maxWidth="95rem">
				<ClubBox club={club} />
			</Container>
			<Carousel />
			<Container maxWidth="95rem">
				<ClubDescription />
				<ClubOfficers />
				<ClubFAQ />
				<InterestedBox club={club} />
			</Container>
		</Layout>
	);
}

function Carousel() {
	return (
		<Box my="20">
			<StyledSwiper
				slidesPerView={2}
				spaceBetween={30}
				loop
				grabCursor={true}
				centeredSlides={true}
				coverflowEffect={{
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				}}
				autoplay={{
					delay: 3700,
					disableOnInteraction: false,
				}}
				modules={[Autoplay, EffectCoverflow]}
			>
				<StyledSwiperSlide>
					<Image src="/sample_club_images/img1.jpg" alt="" objectFit="cover" />
				</StyledSwiperSlide>
				<StyledSwiperSlide>
					<Image src="/sample_club_images/img2.jpg" alt="" />
				</StyledSwiperSlide>
			</StyledSwiper>
		</Box>
	);
}

const StyledSwiper = styled(Swiper)`
	height: 450px;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
	border: 11px solid black;
	border-radius: 28px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 15px;
	}
`;

function ClubBox({ club }: { club: Club }) {
	return (
		<Box
			w={["90%", "90%", "80%"]}
			flexDirection="column"
			bg="#7DF1B9"
			border="5px solid black"
			borderRadius="35px"
			boxShadow="14px 15px black"
			mx="auto"
		>
			{/* Cover Photo */}
			<Img
				h="26rem"
				w="100%"
				alt="something"
				borderRadius="35px"
				src="/club_assets/gdsc-uic2/gdsc-uic-cover-photo.png"
				objectFit="cover"
				borderBottom="3px black solid"
				borderBottomRadius="0"
			/>

			{/* Club Logo */}
			<Box
				px="40px"
				display={["flex", "flex", "block"]}
				justifyContent={["center", "center", "left"]}
			>
				<Img
					mt="-7rem"
					pos="absolute"
					maxW="200px"
					src="/club_assets/gdsc-uic2/logo.png"
					objectFit="cover"
					alt="gdsc-logo"
					border="3px solid black"
					borderRadius="50%"
					boxShadow="5px 7px #68C89A"
				/>
			</Box>

			{/* Club Information */}
			<Flex
				mt={["7", "7", "0"]}
				ml={["0", "0", "16.3rem"]}
				flexDir={["column", "column", "row"]}
				alignItems={["center", "center", "flex-start"]}
				pt={["20", "20", "6"]}
			>
				<Box
					display="flex"
					flexDir="column"
					alignItems={["center", "center", "flex-start"]}
				>
					{/* Club Name & Description */}
					<Box textAlign={["center", "center", "left"]}>
						<Heading fontSize="40" mb="2">
							{club.name}
						</Heading>
						<Text fontSize="20">{club.description?.full ?? ""}</Text>
					</Box>

					{/* Social Media Links */}
					<HStack my="10">
						<BsGithub size="30" />
						<Box h="5" borderLeft="1px solid gray" />
						<BsFacebook size="30" />
					</HStack>
				</Box>

				{/* Interested Button */}
				<Button
					my={["10", "10", "0"]}
					w={["90%", "90%", "0"]}
					mx={[0, 0, "10"]}
					color="white"
					bg="#0057FF"
					border="1px solid black"
					borderRadius="0"
					leftIcon={<AiOutlineHeart color="#000" fontSize="1.2rem" />}
					fontSize="1rem"
					px="5rem"
				>
					Interested
				</Button>
			</Flex>
		</Box>
	);
}

function ClubDescription() {
	return (
		<Box my="3rem">
			<Heading>Description</Heading>
			<Box h="2" w="100%" bg="#94BAF9" />
			<Box>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. In placeat
				commodi corporis quod ratione cupiditate necessitatibus soluta iste
				ipsa, laborum minima impedit adipisci. Quos et libero repellendus sit
				reiciendis repudiandae?
			</Box>
		</Box>
	);
}

function ClubFAQ() {
	return (
		<Box my="3rem">
			<Heading>FAQs</Heading>
			<Box h="2" w="100%" bg="#94BAF9" />
			<Accordion allowToggle my="10">
				<AccordionItem
					border="5px solid black"
					borderRadius="24px"
					boxShadow="8px 8px black"
					mb="1.4rem"
				>
					{({ isExpanded }) => (
						<>
							<AccordionButton>
								<Box
									flex="1"
									textAlign="left"
									fontFamily="Space Grotesk"
									fontWeight="bold"
									fontSize="22px"
								>
									{/* Insert FAQ here */}
									Question #1
								</Box>
								<Box
									transform={isExpanded ? "rotate(45deg)" : ""}
									transition="transform 150ms ease"
								>
									<BsPlus fontSize="40" />
								</Box>
							</AccordionButton>
							<AccordionPanel pb={4}>
								{/* Insert answer here */}
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat.
							</AccordionPanel>
						</>
					)}
				</AccordionItem>
			</Accordion>
		</Box>
	);
}

function ClubOfficers() {
	return (
		<Box my="3rem">
			<Box
				p="8"
				h="340"
				bg="#FFE58A"
				border="5px solid black"
				borderRadius="35px"
				boxShadow="24px 25px black"
			>
				<Heading mb="1rem">Officers</Heading>
				<HStack columnGap="2rem">
					<Box>
						<VStack>
							<Img
								h="10rem"
								w="10rem"
								clipPath="circle()"
								objectFit="cover"
								src="/gdsc-officer.png"
							></Img>

							<Box textAlign="center">
								<Text fontWeight="bold">John Doe</Text>
								<Text>President</Text>
							</Box>
						</VStack>
					</Box>
					<Box>
						<VStack>
							<Img
								h="10rem"
								w="10rem"
								clipPath="circle()"
								objectFit="cover"
								src="/gdsc-officer.png"
							></Img>

							<Box textAlign="center">
								<Text fontWeight="bold">John Doe</Text>
								<Text>Vice President</Text>
							</Box>
						</VStack>
					</Box>
				</HStack>
			</Box>
		</Box>
	);
}

function InterestedBox({ club }: { club: Club }) {
	return (
		<Box
			// h="428"
			bg="#A3F9B6"
			border="5px solid black"
			borderRadius="35px"
			boxShadow="24px 25px black"
			my="9rem"
		>
			<Flex
				h="100%"
				pos="relative"
				flexDirection={["column", "column", "row"]}
				alignItems="center"
			>
				<Flex
					w={["35%", "90%", "65%"]}
					direction="column"
					alignItems={["center", "center", "normal"]}
					px="2rem"
					py={["2rem", "2rem", "0"]}
				>
					<Heading fontWeight="500">Interested to join in</Heading>
					<Heading fontWeight="bold">{club.name}?</Heading>
					<Button
						mt="2rem"
						w="10rem"
						color="white"
						bg="#0057FF"
						border="1px solid black"
						borderRadius="0"
						leftIcon={<AiOutlineHeart color="#000" fontSize="1.2rem" />}
						fontSize="1rem"
						px="6"
					>
						Interested
					</Button>
				</Flex>
				<Box
					h={["0px", "0px", "428px"]}
					w={["100%", "100%", "0px"]}
					borderLeft={["0px", "10px dashed black", "10px dashed black"]}
					borderBottom={["10px dashed black", "10px dashed black", "0px"]}
					right="24"
					top="24"
				/>
				<Box w="50%" h="100%" p="2rem">
					<Heading fontSize="30" mb="1.3rem">
						Connect with the club
					</Heading>
					<Button
						w="100%"
						as="a"
						px="55px"
						py="25px"
						bg="white"
						borderWidth="4px"
						borderColor="black"
						borderRadius="0px"
					>
						Website
					</Button>
				</Box>
			</Flex>
		</Box>
	);
}
