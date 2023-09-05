// React
import { useState, useEffect } from "react";

// Components
import Nav from "./components/nav";
import ProductCard from "./components/productCard";

//Styles
import productGridStyles from "./styles/pages/productGrid.module.css";

// Redux
import { useGetAllProductsQuery } from "./features/product/productSlice";
import { ProductState } from "./types/product";

export default function App() {
	const [products, setProducts] = useState<ProductState[] | never[]>([]);
	const { data } = useGetAllProductsQuery("");

	useEffect(() => {
		if (data) {
			setProducts(data.data);
		}
	}, [data]);

	return (
		<>
			<Nav />
			<main>
				<div className={productGridStyles.grid}>
					{products &&
						products.map((o: ProductState) => {
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
			</main>
		</>
	);
}
