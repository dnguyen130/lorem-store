import { ReactElement } from "react";
import styles from "../../styles/components/productCard.module.css";
import { Link } from "react-router-dom";

interface ProductCardType {
	name: string;
	price: number;
	image: string;
	size: string;
	brand: string;
	id: number;
	onMouseOver: () => void;
	onMouseLeave: () => void;
}

export default function ProductCard({
	name,
	price,
	image,
	size,
	brand,
	id,
	onMouseOver,
	onMouseLeave
}: ProductCardType): ReactElement {
	return (
		<div
			onMouseOver={onMouseOver}
			onMouseLeave={onMouseLeave}
			className={styles.card_container}
		>
			<Link to={`product/${id}`} className={styles.link_container} />
			<img src={image} />
			<p className={styles.brand}>{brand}</p>
			<p className={styles.name}>{name}</p>
			<p className={styles.price}>${price}</p>
			<p className={styles.size}>{size}</p>
			<button
				onClick={(e) => {
					e.preventDefault;
				}}
			>
				Add to Cart
			</button>
		</div>
	);
}
