import { ReactElement } from "react";
import styles from "../../styles/components/nav.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
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
					<NavLink to="cart" className={styles.icon}>
						<FaShoppingCart size="100%" />
					</NavLink>
					<NavLink to="profile" className={styles.icon}>
						<BsFillPersonFill size="100%" />
					</NavLink>
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
