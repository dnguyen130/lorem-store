import { ReactElement } from "react";

import styles from "@/styles/routes/product.module.css";

import { useParams } from "react-router-dom";

import { useAppSelector } from "@/app/hooks";
import { selectActiveProduct } from "@/slices/product/productSlice";

export default function ProductPage(): ReactElement {
	const activeProduct = useAppSelector(selectActiveProduct);
	const params = useParams();

	console.log(params);

	return (
		<div className={styles.container}>
			<div className={styles.column}>
				<img src={activeProduct.image} />
			</div>
			<div className={styles.column}>
				<h2>{activeProduct.name}</h2>
				<h4>{activeProduct.brand}</h4>
				<p>{activeProduct.description}</p>
				<p>Price: {activeProduct.price}</p>
				<button>Add to Cart</button>
			</div>
		</div>
	);
}
