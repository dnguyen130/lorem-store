import { ReactElement } from "react";
import styles from "../../styles/components/productCard.module.css";

interface ProductCardType {
	name: string;
	price: number;
	imageURL: string;
	size: string;
	brand: string;
}

export default function ProductCard({
	name,
	price,
	imageURL,
	size,
	brand
}: ProductCardType): ReactElement {
	return (
		<div className={styles.cardContainer}>
			<img src={imageURL} />
			<p className={styles.brand}>{brand}</p>
			<p className={styles.name}>{name}</p>
			<p className={styles.price}>${price}</p>
			<p className={styles.size}>{size}</p>
			<button>Add to Cart</button>
		</div>
	);
}
