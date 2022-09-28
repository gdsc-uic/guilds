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
	Link,
	Divider,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { BsPlus } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";
import "swiper/css";
import styled from "@emotion/styled";
import { clubAssetURL } from "src/utils";
import { Fragment } from "react";

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
		<Layout maxWidth="full" bgColor={club.theme.primary_color}>
			<Head>
				<title>{club.name}</title>
				<meta name="description" content={`See ${club.name} on Guilds: the official club directory website for the UIC Club Fair 2022`} />
				{/* TODO: social media stuff */}
			</Head>

			<Container maxWidth="85rem">
				<ClubBox club={club} />
			</Container>
			
			{club.assets.slideshows && <Carousel club={club} />}

			<Container maxWidth="85rem" mt="20">
				<ClubContent club={club} />
				<ClubOfficers club={club} />
				{club.faqs && <ClubFAQ club={club} />}
				<InterestedBox club={club} />
			</Container>
		</Layout>
	);
}

function Carousel({ club }: { club: Club }) {
	return (
		<Box mt="20">
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
				{club.assets.slideshows.map(p => (
					<StyledSwiperSlide key={`slideshow_${p}`}>
						<Image src={clubAssetURL(club, 'slideshows', p)} alt={p} objectFit="cover" />
					</StyledSwiperSlide>
				))}
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
			flexDirection="column"
			bg={club.theme?.secondary_color ?? '#7DF1B9'}
			border="5px solid black"
			borderRadius="35px"
			boxShadow="14px 15px black"
		>

			{/* Cover Photo */}
			<Box 
				h="26rem"
				w="full"
				backgroundImage={`url(${clubAssetURL(club, 'cover_photo')})`}
				backgroundSize="cover"
				backgroundPosition="center"
				borderTopRadius="30px"
				borderBottom="3px black solid" />

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
					src={clubAssetURL(club, 'logo')}
					objectFit="cover"
					alt="gdsc-logo"
					border="3px solid black"
					borderRadius="50%"
					boxShadow="5px 7px rgba(0,0,0,0.3)"
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
					{club.links && (<HStack my="10" spacing="4">
						{/* KEEP THE ICONS FOR LATER :>> */}
						{/* <BsGithub size="30" />
						<Box h="5" borderLeft="1px solid gray" />
						<BsFacebook size="30" /> */}
						{club.links.map((link, i, arr) => (
							<Fragment key={`link_top_${link._id}`}>
								<Link key={`link_${link._id}`} href={link.url} fontSize="xl">{link.label}</Link>
								{i < arr.length - 1 && <Box h="3" borderRight="#000 1px solid" />}
							</Fragment>
						))}
					</HStack>)}
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

function ClubContent({ club }: { club: Club }) {
	return (
		<VStack mt="3rem" spacing="3rem">
			<Box>
				<Heading>Description</Heading>
				<Box h="2" w="100%" bg="#94BAF9" my="4" />
				<Text fontSize="xl">{club.description.full}</Text>
			</Box>

			<Box dangerouslySetInnerHTML={{ __html: club.body.html }} />
		</VStack>
	);
}

function ClubFAQ({ club }: { club: Club }) {
	return (
		<Box my="3rem">
			<Heading>FAQs</Heading>
			<Box h="2" w="100%" bg="#94BAF9" />
			<Accordion allowToggle my="10">
				{(club.faqs ?? []).map((faq, i) => (<AccordionItem
					key={`faq_${club._raw.flattenedPath}_i`}
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
									{faq.question ?? 'Question'}
								</Box>
								<Box
									transform={isExpanded ? "rotate(45deg)" : ""}
									transition="transform 150ms ease"
								>
									<BsPlus fontSize="40" />
								</Box>
							</AccordionButton>
							<AccordionPanel pb={4}>{faq.answer ?? 'Answer'}</AccordionPanel>
						</>
					)}
				</AccordionItem>)
			)}
			</Accordion>
		</Box>
	);
}

function ClubOfficers({ club }: { club: Club }) {
	return (
		<Box my="3rem">
			<Box
				h="340"
				bg="#FFE58A"
				border="5px solid black"
				borderRadius="35px"
				boxShadow="24px 25px black"
			>
				<Heading px="8" pt="8" mb="1rem">Officers</Heading>
				<Flex direction="row" px="8" pb="8" overflowX={'auto'} columnGap="2rem">
					{club.officers.map(officer => (
						<Box flexShrink={0} width={(1/8 * 100) + '%'} key={`officer_${officer._id}`}>
							<VStack>
								<Img
									h="10rem"
									w="10rem"
									clipPath="circle()"
									objectFit="cover"
									src={clubAssetURL(club, 'officer_images', officer.photo_name)}
								></Img>

								<Box textAlign="center">
									<Text fontWeight="bold">{officer.name}</Text>
									<Text>{officer.position}</Text>
								</Box>
							</VStack>
						</Box>
					))}
				</Flex>
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
					<VStack spacing="10px">
					{(club.links?.slice(0, 4) ?? []).map(link => (
						<Button
							key={`link_interested_${club._raw.flattenedPath}_${link.label}`}
							w="100%"
							as="a"
							href={link.url}
							target="_blank"
							px="55px"
							py="25px"
							bg="white"
							borderWidth="4px"
							borderColor="black"
							borderRadius="0px"
						>
							{link.label}
						</Button>
					))}
					</VStack>
				</Box>
			</Flex>
		</Box>
	);
}
