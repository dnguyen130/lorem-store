import { ReactElement } from "react";
import styles from "../../styles/components/productCard.module.css";

interface ProductCardType {
	name: string;
	price: number;
	imageURL: string;
}

export default function ProductCard({
	name,
	price,
	imageURL
}: ProductCardType): ReactElement {
	return (
		<div className={styles.cardContainer}>
			<figure>
				<img src={imageURL} />
				<figcaption>{name}</figcaption>
			</figure>
			<p>${price}</p>
			<button>Add to Cart</button>
		</div>
	);
}
