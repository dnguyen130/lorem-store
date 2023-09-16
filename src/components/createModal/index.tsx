import { ReactElement } from "react";

import styles from "@/styles/components/createModal.module.css";

export default function CreateModal(): ReactElement {
	return (
		<div className="overlay">
			<div className={styles.container}></div>
		</div>
	);
}
