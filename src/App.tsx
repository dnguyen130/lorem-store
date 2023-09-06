// Components
import Nav from "./components/nav";

// React Router
import { Outlet } from "react-router-dom";

export default function App() {
	return (
		<>
			<Nav />
			<main>
				<Outlet />
			</main>
		</>
	);
}
