import { ReactElement } from "react";
import styles from "../../styles/components/header.module.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Links = [
	{
		title: "Home",
		link: "/"
	},
	{
		title: "Create Product",
		link: "createproduct"
	}
];

export default function Nav(): ReactElement {
	return (
		<header className={styles.nav}>
			<div className={styles.headerRow}>
				<NavLink to="/">
					<h1>Lorem</h1>
				</NavLink>
				<div className={styles.headerRight}>
					<input />
					<div className={styles.icon}>
						<FaSearch size="100%" />
					</div>
					<div className={styles.icon}>
						<FaShoppingCart size="100%" />
					</div>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.links}>
					{Links.map((o, i) => {
						return (
							<NavLink key={i} to={o.link}>
								<h2>{o.title}</h2>
							</NavLink>
						);
					})}
				</div>
			</div>
		</header>
	);
}
