import Nav from "./components/nav";
import productGridStyles from "./styles/pages/productGrid.module.css";
import ProductCard from "./components/productCard";
import products from "../data/products.json";

export default function App() {
	return (
		<>
			<Nav />
			<main>
				<div className={productGridStyles.grid}>
					{products.map((o) => {
						return (
							<ProductCard name={o.name} price={o.price} imageURL={o.url} />
						);
					})}
				</div>
			</main>
		</>
	);
}
