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
	Stack,
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
import { useRouter } from "next/router";

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
	const router = useRouter();
	const getUrl = (path: string): string => {
		return router.basePath + path;
	}

	return (
		<Layout maxWidth="full" bgColor={club.theme.primary_color}>
			<Head>
				<title>{club.name} - Guilds</title>
				<meta name="description" content={`Join ${club.name} on Guilds: the official club directory website for the UIC Club Fair 2022`} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={getUrl(clubAssetURL(club, 'cover_photo'))} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>

			<Container maxWidth="85rem">
				<ClubBox club={club} />
			</Container>
			
			{club.assets.slideshows && <Carousel club={club} />}

			<Container maxWidth="85rem" mt="20">
				<ClubContent club={club} />
				<ClubOfficers club={club} />
				{club.faqs && <ClubFAQ club={club} />}
				{(club.registration || club.links) && <InterestedBox club={club} />}
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
	min-height: 450px;

	.swiper-wrapper {
		align-items: center;
	}
`;

const StyledSwiperSlide = styled(SwiperSlide)`
	border: 11px solid black;
	border-radius: 28px;

	img {
		width: 100%;
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
				h={{sm: "18rem", md: "26rem"}}
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
				justifyContent={"space-between"}
				pt={["20", "20", "6"]}
			>
				<Box
					display="flex"
					flexDir="column"
					alignItems={["center", "center", "flex-start"]}
				>
					{/* Club Name & Description */}
					<Box textAlign={["center", "center", "left"]} px={{sm: "8", md: 0}} pb={8} pr={club.org_type == 'academic' ? {sm: 8, lg: 28} : 0}>
						<Heading fontSize={{sm: 30, lg: 40}} mb="2">
							{club.name}
						</Heading>
						<Text fontSize={{sm: 18, lg: 20}}>{club.description?.short ?? ""}</Text>
					</Box>

					{/* Social Media Links */}
					{club.links && (<HStack my="10" spacing="4" wrap="wrap" px={{sm: 8, md: 0}} justifyContent="center">
						{/* KEEP THE ICONS FOR LATER :>> */}
						{/* <BsGithub size="30" />
						<Box h="5" borderLeft="1px solid gray" />
						<BsFacebook size="30" /> */}
						{club.links.map((link, i, arr) => (
							<Fragment key={`link_top_${link._id}`}>
								{link.label !== 'Contact Number' ? 
									<Link key={`link_${link._id}`} href={link.url} fontSize="xl">{link.label}</Link> :
									<Text textAlign="center" fontSize="xl">{link.label}: {link.url}</Text>}
								{i < arr.length - 1 && <Box h="3" borderRight="#000 1px solid" />}
							</Fragment>
						))}
					</HStack>)}
				</Box>

				{/* Interested Button */}
				{(club.org_type === 'non-academic' && club.registration) && <Button
					as="a"
					href="#interested"
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
				</Button>}
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
				<Text fontSize={["1.1rem", "1.15rem", "1.2rem"]}>
					{club.description.full}
				</Text>
			</Box>

			<Box
				dangerouslySetInnerHTML={{ __html: club.body.html }}
				fontSize={["1.1rem", "1.15rem", "1.2rem"]}
			/>
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
						<Box flexShrink={0} width={{sm: (1/3 * 100) + '%', md: (1/6 * 100) + '%', lg: (1/8 * 100) + '%'}} key={`officer_${officer.name}`}>
							<VStack>
								<Image
									h="10rem"
									w="10rem"
									clipPath="circle()"
									objectFit="cover"
									alt={officer.name}
									fallbackSrc="/blank-profile.webp"
									src={clubAssetURL(club, 'officer_images', officer.photo_name)}
								></Image>

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
		<Flex
			id="interested"
			// h="428"
			bg="#A3F9B6"
			border="5px solid black"
			borderRadius="35px"
			boxShadow="24px 25px black"
			my="9rem"
			minH={["0px", "0px", "428px"]}
			flexDirection={["column", "column", "row"]}
			alignItems="center"
		>
			{club.registration && <Flex
				w={club.links && club.registration ? ["35%", "90%", "65%"] : "100%"}
				direction="column"
				alignItems={["center", "center", club.links && club.registration ? "normal" : "center"]}
				px="2rem"
				py={["2rem", "2rem", "0"]}
			>
				<Heading 
					textAlign={{sm: "center", md: !club.links ? "center" : "left"}} 
					fontWeight="500">
						Interested to join in <b>{club.name}</b>?
				</Heading>
				<Stack direction={{sm: "column", md: "row"}} width={{sm: "full", md: "auto"}} mt="2rem">
					{club.registration.form_url && <Button
						as="a"
						href={club.registration.form_url}
						target="_blank"
						w={{sm: "full", md: "auto"}}
						color="white"
						bg="#0057FF"
						border="1px solid black"
						borderRadius="0"
						fontSize="15"
						px="6"
					>
						Register
					</Button>}

					{club.registration.livestream_url && <Button
						as="a"
						href={club.registration.livestream_url}
						target="_blank"
						w={{sm: "full", md: "auto"}}
						color="white"
						bg="#0057FF"
						border="1px solid black"
						borderRadius="0"
						fontSize="15"
						px="6"
					>
						Livestream
					</Button>}

					{club.registration.meeting_url && <Button
						as="a"
						href={club.registration.meeting_url}
						target="_blank"
						w={{sm: "full", md: "auto"}}
						color="white"
						bg="#0057FF"
						border="1px solid black"
						borderRadius="0"
						fontSize="15"
						px="6"
					>
						Join Event
					</Button>}
				</Stack>
			</Flex>}
			{(club.links && club.registration) && <Box
				h={["0px", "0px", "428px"]}
				w={["100%", "100%", "0px"]}
				borderLeft={["0px", "10px dashed black", "10px dashed black"]}
				borderBottom={["10px dashed black", "10px dashed black", "0px"]}
				right="24"
				top="24"
			/>}
			{club.links && <Box w={{base: "100%", md: "50%"}} mx={club.registration ? 0 : "auto"} h="100%" p="2rem">
				<Heading fontSize="30" mb="1.3rem" textAlign={club.registration ? {sm: "center", md: "left"} : "center"}>
					Connect with the club
				</Heading>
				<VStack spacing="10px" width={"full"}>
				{(club.links?.slice(0, 4) ?? []).map(link => link.label === 'Contact Number' ? (
					<Button
						key={`link_interested_${club._raw.flattenedPath}_${link.label}`}
						as="p"
						px="55px"
						py="25px"
						bg="white"
						borderWidth="4px"
						borderColor="black"
						borderRadius="0px"
						textAlign="center"
						width="full"
					>
						{link.label}: {link.url}
					</Button>
				) : (
					<Button
						key={`link_interested_${club._raw.flattenedPath}_${link.label}`}
						as="a"
						href={link.url}
						target="_blank"
						px="55px"
						py="25px"
						bg="white"
						borderWidth="4px"
						borderColor="black"
						borderRadius="0px"
						width="full"
					>
						{link.label}
					</Button>
				))}
				</VStack>
			</Box>}
		</Flex>
	);
}
