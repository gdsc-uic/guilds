import Head from "next/head";
import { allClubs, Club } from "contentlayer/generated";

export default function ClubPage({ club }: { club: Club }) {
	return (
		<div>
			<Head>
				<title>{club.name}</title>
				<meta name="description" content={club.description?.long ?? ""} />
			</Head>

			<h1>{club.name}</h1>
			<p>{club.description?.long ?? ""}</p>
			<div dangerouslySetInnerHTML={{ __html: club.body.html }}></div>
		</div>
	);
}

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
		<Layout>
			<Head>
				<title>{club.name}</title>
				<meta name="description" content={club.description?.long ?? ""} />
			</Head>
			<ClubBox club={club} />
			<Carousel />
			<Container maxW="70rem" px="2rem" my="8rem">
				<ClubDescription />
				<ClubOfficers />
				<ClubFAQ />
				<InterestedBox club={club} />
			</Container>
			<Footer />
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
			w="80%"
			h="650"
			bg="#7DF1B9"
			border="5px solid black"
			borderRadius="35px"
			boxShadow="24px 25px black"
			mx="auto"
		>
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

			<Flex>
				<Box px="40px">
					<Img
						mt="-7rem"
						maxW="200px"
						src="/club_assets/gdsc-uic2/logo.png"
						objectFit="cover"
						alt="gdsc-logo"
						border="3px solid black"
						borderRadius="50%"
						boxShadow="5px 7px #68C89A"
					/>
				</Box>

				<Flex mt="7">
					<Box>
						<Box>
							<Heading fontSize="40" mb="2">
								{club.name}
							</Heading>
							<Text fontSize="20">{club.description?.long ?? ""}</Text>
						</Box>

						<HStack>
							<BsGithub size="30" />
							<BsFacebook size="30" />
						</HStack>
					</Box>

					<Box mx="10">
						<Button
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
					</Box>
				</Flex>
			</Flex>
		</Box>
	);
}
