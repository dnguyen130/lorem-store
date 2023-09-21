import { ReactElement } from "react";
import styles from "../../styles/components/productCard.module.css";
import { Link } from "react-router-dom";

interface ProductCardType {
	name: string;
	price: number;
	imageURL: string;
	size: string;
	brand: string;
	id: number;
}

export default function ProductCard({
	name,
	price,
	imageURL,
	size,
	brand,
	id
}: ProductCardType): ReactElement {
	return (
		<Link to={`products/${id}`}>
			<div className={styles.cardContainer}>
				<img src={imageURL} />
				<p className={styles.brand}>{brand}</p>
				<p className={styles.name}>{name}</p>
				<p className={styles.price}>${price}</p>
				<p className={styles.size}>{size}</p>
				<button onClick={(e) => e.stopPropagation}>Add to Cart</button>
			</div>
		</Link>
	);
}
