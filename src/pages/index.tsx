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
} from "@chakra-ui/react";
import ClubCard from "src/components/ClubCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Layout from "src/components/layout";
import { FormEvent, FormEventHandler, useEffect } from "react";
import { clubAssetURL, fetcher } from "src/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const CLUBS_ENDPOINT = '/api/clubs';

export default function Home() {
	const router = useRouter();
	const { data: clubs, error, refetch } = useQuery<Club[]>([CLUBS_ENDPOINT, router.query], ({ queryKey }) => {
		const [_, queryParams] = queryKey;
		return fetcher(CLUBS_ENDPOINT + `/?${stringify(queryParams)}`);
	});

	const { data: clubTags } = useQuery<String[]>([CLUBS_ENDPOINT + '/tags'], () => fetcher(CLUBS_ENDPOINT + '/tags'));

	// TODO: change route if query changes!
	const handleSearchBar = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const query = data.get('search_query');
		if (!query) return;
		router.push(`/?q=${query}`, undefined, { shallow: true });
	}

	useEffect(() => {
		refetch();
	}, [router.query]);

	return (
		<Layout isHome>
			<Head>
				<title>Guilds - UIC Club Fair 2022 Directory Website</title>
				<meta name="description" content="Find a place where your heart beats. The official club directory website for the UIC Club Fair 2022" />
				<link rel="icon" href="/favicon.ico" />
				{/* TODO: social media stuff */}
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
				<GuildsModal />
			</Flex>

			<StyledSlideShow loop>
				{clubs?.map(club => (
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
				mt={{sm: "20", md: "200"}} 
				color="#555555" 
				fontWeight="bold" 
				flexDirection="column">
				<Heading fontSize={["35", "35", "53"]} mb="2rem" textAlign="center">
					Find and join existing clubs
				</Heading>
				
				<VStack spacing="10">
					<SearchBar onSubmit={handleSearchBar} />

					<Stack 
						alignItems="center" 
						direction="row" 
						wrap="wrap" 
						justifyContent="center" 
						shouldWrapChildren>
					{(clubTags ?? []).map(tag => (
						<Button
							key={`tag_${tag}`}
							bg="#F2779A"
							color="white"
							onClick={() => router.push(`/?q=${tag}`, undefined, { shallow: true })}
							w="14rem"
							py="25"
							mt={["1rem", "1rem", "0"]}
							borderRadius="0"
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

function ClubResults({ clubs, error }: {clubs: Club[] | null, error?: any}) {
	return (
		<Flex
			wrap="wrap"
			columnGap="1rem"
			rowGap="1rem"
			my="10rem"
			width="full"
		>
			{error && <h1>Fetch error</h1>}
			{!clubs && !error && <h1>Loading</h1>}
			{clubs && clubs.map((club) => (
				<Box 
					key={club._id} 
					width={{sm: "100%", md: ((1/2) * 100) + '%', lg: ((1/4) * 100) + '%'}}>
					<ClubCard club={club} />
				</Box>
			))}
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
					name="search_query"
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
	// TODO: show modal on first time visit
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
