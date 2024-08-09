import Head from "next/head";
import { Club } from "contentlayer/generated";
import styled from "@emotion/styled";
import { stringify } from "qs";
import {
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
	Stack,
	AspectRatio,
} from "@chakra-ui/react";
import ClubCard from "src/components/ClubCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Layout from "src/components/layout";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { clubAssetURL, fetcher } from "src/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const CLUBS_ENDPOINT = '/api/clubs';

export default function Home() {
	const router = useRouter();

	const { data: featuredClubs } = useQuery<Club[]>([CLUBS_ENDPOINT, 'all'], () => fetcher(CLUBS_ENDPOINT));
	const { data: clubs, error, refetch } = useQuery<Club[]>([CLUBS_ENDPOINT, router.query], ({ queryKey }) => {
		const [_, queryParams] = queryKey;
		return fetcher(CLUBS_ENDPOINT + `/?${stringify(queryParams)}`);
	});

	const { data: clubTags } = useQuery<String[]>([CLUBS_ENDPOINT + '/tags'], () => fetcher(CLUBS_ENDPOINT + '/tags'));
	const handleSearchBar = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const query = data.get('search_query');
		if (!query) return router.push(`/`, undefined, { shallow: true });
		router.push(`/?q=${query}`, undefined, { shallow: true });
	}

	const { isOpen, onOpen: onModalOpen, onClose } = useDisclosure();
	useEffect(() => {
		if (!localStorage.getItem('__guilds_first')) {
			onModalOpen();
			localStorage.setItem('__guilds_first', '1');
		}
	}, []);

	useEffect(() => {
		refetch();
	}, [router.query]);

	const getUrl = (path: string): string => {
		return router.basePath + path;
	}

	return (
		<Layout isHome>
			<Head>
				<title>Guilds - UIC Club Fair 2024 Directory Website</title>
				<meta name="description" content="Find a place where your heart beats. The official club directory website for the UIC Club Fair 2024" />
				<link rel="icon" href="/favicon.ico" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={getUrl('/guilds-default-cover.png')} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>

			<Flex
				mb="1.4rem"
				flexDirection={["column", "column", "row"]}
				textAlign={["center", "center", "left"]}
				alignItems={["center", "center", "flex-start"]}
			>
				<Heading color="white" fontWeight="500">
					Find a place where your
					<Text fontWeight="bold">heart beats</Text>
				</Heading>
				<Spacer />
				<Button
					bg="#F2779A"
					color="white"
					// px="55"
					w="14rem"
					py="25"
					mt={["1rem", "1rem", "0"]}
					borderRadius="15"
					borderWidth="4px"
					borderColor="black"
					boxSizing="border-box"
					onClick={onModalOpen}
				>
					What is Guilds ?
				</Button>

				<GuildsModal
					isOpen={isOpen}
					onClose={onClose} />
			</Flex>

			{/* {sm: 1330/760, md: 1330/560} */}
			<AspectRatio ratio={[1000 / 500, 1330 / 760, 1330 / 560]}>
				<StyledSlideShow loop autoplay={{ delay: 1200 }}> {/* Adjust delay as needed */}
					{featuredClubs?.filter(club => !!club.assets.cover_photo).map(club => (
						<SwiperSlide key={`club_featured_${club._id}`}>
							<Image
								src={clubAssetURL(club, 'cover_photo')}
								alt={club.name}
								objectFit="cover"
								w="full"
								h="full"
							/>
						</SwiperSlide>
					))}
				</StyledSlideShow>
			</AspectRatio>

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
				mt={["20", "50", "100"]}
				color="#000000"
				fontWeight="bold"
				flexDirection="column">
				<Heading fontSize={["35", "35", "53"]} mb="2rem" textAlign="center">
					Find and join existing clubs
				</Heading>

				<VStack spacing="10">
					<SearchBar
						query={router.query['q']?.toString() ?? ''}
						onSubmit={handleSearchBar} />

					<Stack
						alignItems="center"
						direction="row"
						wrap="wrap"
						m={'0px'}
						// columnGap="1rem"
						rowGap="0.5rem"
						justifyContent="center"
					// shouldWrapChildren
					// px="1rem"
					// spacing="1rem"
					>
						{(clubTags ?? []).map(tag => (
							<Button
								key={`tag_${tag}`}
								bg="#F2779A"
								color="white"
								onClick={() => router.push(`/?q=${tag}`, undefined, { shallow: true })}
								minW={{ sm: "auto", md: "10rem", lg: "14rem" }}
								py="25"
								// mt={["1rem", "1rem", "0"]}
								marginLeft={"8px"}
								borderRadius="15px"
								borderWidth="4px"
								borderColor="black"
								boxSizing="border-box"
							>
								{tag}
							</Button>
						))}
					</Stack>
				</VStack>
			</Center>

			<ClubResults clubs={clubs} error={error} />
		</Layout>
	);
}

function ClubResults({ clubs, error }: { clubs: Club[] | null, error?: any }) {
	return (
		<Flex
			wrap="wrap"
			my="10rem"
			width="full"
		>
			{error && <h1>Fetch error</h1>}
			{!clubs && !error && <h1>Loading</h1>}
			{clubs && clubs.map((club) => (
				<Box
					key={club._id}
					p="0.5rem"
					width={{ base: "100%", sm: "100%", md: "50%", lg: "25%" }}
					minWidth="300px"
				>
					<ClubCard club={club} />
				</Box>
			))}
		</Flex>
	);
}

function SearchBar({ query, onSubmit }: { query: string, onSubmit: FormEventHandler<HTMLFormElement> }) {
	return (
		<form onSubmit={onSubmit}>
			<InputGroup
				width="clamp(23rem, 90vw, 47rem)"
				height={["4rem", "5rem"]}
				size="lg"
				borderColor="black"
			>
				<Input
					placeholder={"Search for a club"}
					p="2"
					h="100%"
					bg="white"
					defaultValue={query}
					borderRadius="0"
					borderWidth="4px"
					boxShadow="-7px 7px black"
					name="search_query"
				/>
				<InputRightElement
					w={["9rem", "9rem", "13rem"]}
					h="100%"
				>
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
	max-height: 420px;
	background-color: lightgray;
	position: relative;
	color: white;
	border-width: 6px;
	border-radius: 25px;
	border-color: black;
	

	@media (min-width: 62em) {
		max-height: 592px;
	}
`;

function GuildsModal({ isOpen, onClose }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				border="10px solid black"
				borderRadius="50px"
				p="10"
				maxW={["90%", "60rem"]}
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
					<VStack alignItems="center">
						<ModalBody textAlign="center">
							<Image
								src="/guilds-emblem.png"
								alt="Guilds"
								width={["60%", "40%"]}
								mx="auto"
								mb="4rem"
							/>
							<Text
								fontFamily="Space Grotesk"
								fontSize={["20px", "30px", "50px", "70px"]}
								fontWeight="bold"
							>
								Welcome to Guilds!
							</Text>
							<Text fontSize={["16px", "20px"]}>
								Guilds is the official club directory website for the UIC Club Fair 2024.
								You can search and browse all the clubs and organizations the university has to offer.
								Search your interests and find the best place where your heart beats!
							</Text>
						</ModalBody>
						<ModalFooter justifyContent="center">
							<Button
								px={["2rem", "7rem"]}
								py={["1rem", "2rem"]}
								boxShadow="5px 5px 0px black"
								borderRadius="0px"
								bg="#F2779A"
								color="white"
								border="3px solid black"
								onClick={onClose}
							>
								Get Started!
							</Button>
						</ModalFooter>
					</VStack>
				</Flex>
			</ModalContent>
		</Modal>
	);
}
