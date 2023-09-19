// React
import { ReactElement, useState, useEffect } from "react";

// Styles
import styles from "@/styles/routes/productGrid.module.css";

// Types
import { ProductState } from "@/types/product";

//Redux
import { useGetProductsByPageQuery } from "@/features/product/productSlice";
import { useAppDispatch } from "@/app/hooks";
import { setIsProductModal } from "@/features/modal/modalSlice";

//Components
import ProductCard from "@/components/productCard";

export default function Home(): ReactElement {
	const [products, setProducts] = useState<ProductState[] | never[]>([]);
	const { data } = useGetProductsByPageQuery("1");
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (data && data.data !== products) {
			setProducts(data.data);
		}
	}, [data, products]);

	return (
		<div className={styles.container}>
			<div className={styles.grid}>
				{products.map((o: ProductState) => {
					return (
						<ProductCard
							key={o.id}
							name={o.name}
							price={o.price}
							imageURL={o.image}
							size={o.size}
							brand={o.brand}
							onClick={() => dispatch(setIsProductModal(true))}
						/>
					);
				})}
			</div>
		</div>
	);
}
