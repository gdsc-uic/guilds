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
