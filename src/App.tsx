// Components
import Nav from "./components/nav";
import CreateModal from "./components/createModal";

// React Router
import { Outlet } from "react-router-dom";

export default function App() {
	return (
		<>
			<Nav />
			<main>
				<Outlet />
				<CreateModal />
			</main>
		</>
	);
}
