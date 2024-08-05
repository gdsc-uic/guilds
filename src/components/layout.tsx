import { Box, Button, Container, HStack, Text } from "@chakra-ui/react";
import CurveBackground from "./CurveBackground";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children, maxWidth = '90rem', bgColor = '#0057FF', isHome = false }) {
	return (
		<Box position="relative">
			<Box width="full" zIndex="-1">
				<CurveBackground fill={bgColor} />
			</Box>
			{isHome && <Box
				position="absolute"
				top="0"
				width="full"
				height="full"
				zIndex="-2"
				bgColor="#FFF6EA" />}
			<Box>
				<NavBar />
				<Box mx="auto" px={maxWidth !== 'full' ? '1rem' : '0'} maxWidth={maxWidth}>
					{children}
				</Box>

				<Box position="sticky" bottom={0} insetX={0} bgColor="#FFE58A" zIndex={999}>
					<HStack justifyContent={"center"}  paddingX={'16px'} borderTop={"8px #000 solid"} py="4">
						<Text fontFamily={"Space Grotesk"} fontSize="20" fontWeight={"bold"}>
							Guilds is still in beta. Help us make it better!
						</Text>

						<Button
							as="a"
							href="https://docs.google.com/forms/d/e/1FAIpQLSekeADCSAqtMjjRiLEzMfcevWlLS9Az53bmo01zFgQJYeGfQg/viewform?usp=sf_link"
							target="_blank"
							bg="#F2779A"
							color="white"
							// px="55"
							w="8rem"
							py="4"
							borderRadius="15"
							borderWidth="4px"
							borderColor="black"
							boxSizing="border-box"
						>
							Feedback
						</Button>
					</HStack>
				</Box>
				<Footer />
			</Box>
		</Box>
	);
}
