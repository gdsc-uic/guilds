import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Club } from "contentlayer/generated";
import styled from "@emotion/styled";
import {
	Container,
	Text,
	Heading,
	Box,
	Flex,
	Button,
	Spacer,
	Input,
	InputGroup,
	InputRightElement,
	Center,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	VStack,
	ModalFooter,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import ClubCard from "src/components/ClubCard";
import Footer from "src/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import Layout from "src/components/layout";
import { FormEvent, FormEventHandler, useState } from "react";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "src/utils";

const CLUBS_ENDPOINT = '/api/clubs';

export async function getServerSideProps() {
	const clubsList = await fetcher(CLUBS_ENDPOINT);

	return {
		props: {
			fallback: {
				[CLUBS_ENDPOINT]: clubsList
			}
		}
	}
}

export default function Home({ fallback }) {
	// TODO: use react query!!
	const [endpointPath, setEndpointPath] = useState(CLUBS_ENDPOINT);
	const { data: clubs, error } = useSWR<Club[]>(endpointPath, fetcher);

	const handleSearchBar = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		let query = data.get('q');
		if (query) {
			query = '?q=' + query;
		} else {
			query = '';
		}

		setEndpointPath(CLUBS_ENDPOINT + query);
	}

	return (
		<SWRConfig value={{ fallback }}>
			<Layout>
				<Head>
					<title>Create Next App</title>
					<meta name="description" content="Generated by create next app" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Container maxWidth="95rem">
					<Flex
						mb="1.4rem"
						flexDirection={["column", "column", "row"]}
						textAlign={["center", "center", "left"]}
						alignItems={["center", "center", "flex-start"]}
					>
						<Heading color="white" fontWeight="500">
							Find your place where your
							<Text fontWeight="bold">heart beats</Text>
						</Heading>
						<Spacer />
						<GuildsModal />
					</Flex>

					<StyledSlideShow loop>
						<SwiperSlide>
							<Image
								src="/sample_club_images/img1.jpg"
								alt="slide 1"
								objectFit="fill"
								h="100%"
								w="100%"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<Image
								src="/sample_club_images/img2.jpg"
								alt="slide 1"
								objectFit="cover"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<Image
								src="/sample_club_images/img3.jpg"
								alt="slide 1"
								objectFit="cover"
							/>
						</SwiperSlide>
					</StyledSlideShow>

					<Image
						src="/girl.png"
						pos="absolute"
						display={["none", "block", "block", "block"]}
						left="0"
						zIndex="-1"
						alt="girl"
						h={[null, "350px", "500px", "700px"]}
						ml="-5"
						top={["60rem", "68rem", "57rem", "63rem"]}
					/>

					<Center 
						mt="200" 
						color="#555555" 
						fontWeight="bold" 
						flexDirection="column">
						<Heading fontSize={["35", "35", "53"]} mb="2rem" textAlign="center">
							Find and join existing clubs
						</Heading>
						<SearchBar onSubmit={handleSearchBar} />
					</Center>

					<Center
						mt="200"
						color="#555555"
						fontWeight="bold"
						flexDirection="column"
					>
						<ClubResults clubs={clubs} error={error} />
					</Center>
				</Container>

				<Footer />
			</Layout>
		</SWRConfig>
	);
}

function ClubResults({ clubs, error }: {clubs: Club[] | null, error?: any}) {
	return (
		<Flex
			wrap="wrap"
			columnGap="1rem"
			rowGap="1rem"
			my="10rem"
			justifyContent="center"
		>
			{error && <h1>Fetch error</h1>}
			{!clubs && !error && <h1>Loading</h1>}
			{clubs && clubs.map((club) => <ClubCard key={club._id} />)}
		</Flex>
	);
}

function SearchBar({ onSubmit }: { onSubmit: FormEventHandler<HTMLFormElement> }) {
	return (
		<form onSubmit={onSubmit}>
			<InputGroup
				width={["15rem", "28rem", "38rem", "40rem", "47rem"]}
				size="lg"
				borderColor="black"
			>
				<Input
					placeholder={"Search for a club"}
					p="9"
					bg="white"
					borderRadius="0"
					borderWidth="4px"
					boxShadow="-7px 7px black"
				/>
				<InputRightElement w={["9rem", "9rem", "13rem"]} h="100%">
					<Button
						h="100%"
						w="100%"
						borderRadius="0"
						borderWidth="4px"
						borderColor="black"
						bg="#0057ff"
						color="white"
					>
						Search
					</Button>
				</InputRightElement>
			</InputGroup>
		</form>
	);
}

const StyledSlideShow = styled(Swiper)`
	height: 420px;
	background-color: lightgray;
	position: relative;
	color: white;
	border-width: 6px;
	border-radius: 50px;
	border-color: black;
	box-shadow: 11px 11px #7a97ff;

	@media (min-width: 62em) {
		box-shadow: 37px 37px #7a97ff;
		height: 592px;
	}
`;

function GuildsModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button
				bg="#F2779A"
				color="white"
				// px="55"
				w="14rem"
				py="25"
				mt={["1rem", "1rem", "0"]}
				borderRadius="0"
				borderWidth="4px"
				borderColor="black"
				boxSizing="border-box"
				onClick={onOpen}
			>
				What is Guilds
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					border="10px solid black"
					borderRadius="50px"
					p="10"
					maxW="60rem"
					bg="#FFECEC"
				>
					<ModalCloseButton
						_hover={{
							background: "red",
							color: "white",
							borderRadius: "50%",
						}}
						borderRadius="50%"
						fontSize="15px"
						m="1rem"
					/>
					<Flex>
						<Box
							h="30rem"
							w="30rem"
							boxShadow="10px 10px 0px black"
							borderRadius="50px"
							border="10px solid black"
							bg="#0057ff"
						></Box>

						<VStack alignItems="flex-end">
							<ModalBody ml="3rem">
								<Heading fontWeight="500" fontSize="30">
									What is Guilds?
								</Heading>
								<Text
									fontFamily="Space Grotesk"
									fontSize="50"
									fontWeight="bold"
								>
									Discover your Interests
								</Text>
								lorem ipsum dolor sit amet
							</ModalBody>
							<ModalFooter>
								<Button
									// p="1.2rem"
									px="7rem"
									py="2rem"
									boxShadow="5px 5px 0px black"
									borderRadius="0px"
									bg="#F2779A"
									color="white"
									fontFamily="Montserrat"
									border="3px solid black"
								>
									Next
								</Button>
							</ModalFooter>
						</VStack>
					</Flex>
				</ModalContent>
			</Modal>
		</>
	);
}
