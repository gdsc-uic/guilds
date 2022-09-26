import Link from "next/link";
import Guilds from "./logos/Guilds";

export default function NavigationBar() {
	return (
		<Link href="/">
			<a>
				<Guilds />
			</a>
		</Link>
	);
}
