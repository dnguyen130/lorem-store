import { ReactElement } from "react";
import styles from "../../styles/components/header.module.css";
import navigation from "../../../data/navigation.json";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

export default function Nav(): ReactElement {
	return (
		<header className={styles.nav}>
			<div className={styles.headerRow}>
				<a href="/">
					<h1>Lorem</h1>
				</a>
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
					{navigation.map((o) => {
						return (
							<a href={o.link}>
								<h2>{o.title}</h2>
							</a>
						);
					})}
				</div>
			</div>
		</header>
	);
}
