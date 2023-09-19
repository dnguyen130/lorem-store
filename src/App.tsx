// Components
import Nav from "./components/nav";

// React Router
import { Outlet } from "react-router-dom";
import Overlay from "./components/overlay";

// Redux

export default function App() {
	return (
		<>
			<Nav />
			<main>
				<Overlay />
				<Outlet />
			</main>
		</>
	);
}
