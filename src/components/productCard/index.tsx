import { ReactElement } from "react";
import styles from "../../styles/components/productCard.module.css";

interface ProductCardType {
	name: string;
	price: string;
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
				<caption>{name}</caption>
			</figure>
			<p>${price}</p>
			<button>Add to Cart</button>
		</div>
	);
}
