import { ReactElement, useState } from "react";
import { useOutlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Nav from "./components/nav";

// React Router
import Overlay from "./components/overlay";

const AnimatedOutlet = (): ReactElement => {
	const o = useOutlet();
	const [outlet] = useState(o);
	return <>{outlet}</>;
};

export default function App() {
	const location = useLocation();

	return (
		<>
			<Nav />
			<Overlay />
			<main>
				<AnimatePresence mode="wait">
					<motion.div
						key={location.pathname}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							type: "linear",
							duration: 0.2
						}}
					>
						<AnimatedOutlet />
					</motion.div>
				</AnimatePresence>
			</main>
		</>
	);
}
