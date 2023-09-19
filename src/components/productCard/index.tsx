import { ReactElement } from "react";
import styles from "../../styles/components/productCard.module.css";

interface ProductCardType {
	name: string;
	price: number;
	imageURL: string;
	size: string;
	brand: string;
	onClick: () => void;
}

export default function ProductCard({
	name,
	price,
	imageURL,
	size,
	brand,
	onClick
}: ProductCardType): ReactElement {
	return (
		<div className={styles.cardContainer} onClick={onClick}>
			<img src={imageURL} />
			<p className={styles.brand}>{brand}</p>
			<p className={styles.name}>{name}</p>
			<p className={styles.price}>${price}</p>
			<p className={styles.size}>{size}</p>
			<button onClick={(e) => e.stopPropagation}>Add to Cart</button>
		</div>
	);
}
