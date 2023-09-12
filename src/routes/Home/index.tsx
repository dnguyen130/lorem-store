// React
import { ReactElement, useState, useEffect } from "react";

// Styles
import styles from "@/styles/routes/productGrid.module.css";

// Types
import { ProductState } from "@/types/product";

//Redux
import { useGetAllProductsQuery } from "@/features/product/productSlice";

//Components
import ProductCard from "@/components/productCard";

export default function Home(): ReactElement {
	const [products, setProducts] = useState<ProductState[] | never[]>([]);
	const { data } = useGetAllProductsQuery("");

	useEffect(() => {
		if (data && data.data !== products) {
			setProducts(data.data);
		}
	}, [data, products]);

	return (
		<div className={styles.grid}>
			{products.map((o: ProductState) => {
				return (
					<ProductCard
						key={o.id}
						name={o.name}
						price={o.price}
						imageURL={o.image}
					/>
				);
			})}
		</div>
	);
}
