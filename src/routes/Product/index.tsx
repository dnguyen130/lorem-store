import { ReactElement, useEffect } from "react";

import styles from "@/styles/routes/product.module.css";

import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
	selectActiveProduct,
	useGetProductByIdQuery,
	setActiveProduct
} from "@/slices/product/productSlice";

export default function ProductPage(): ReactElement {
	const activeProduct = useAppSelector(selectActiveProduct);
	const dispatch = useAppDispatch();
	const { productId } = useParams();
	const { data, isLoading } = useGetProductByIdQuery(String(productId));

	useEffect(() => {
		if (data) {
			const product = data.data[0];
			dispatch(setActiveProduct(product));
		}
	});

	if (isLoading && activeProduct.id === -1) {
		return <div>Loading</div>;
	}

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
				<button onClick={() => console.log(activeProduct)}>Add to Cart</button>
			</div>
		</div>
	);
}
