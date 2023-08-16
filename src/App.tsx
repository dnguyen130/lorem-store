import Nav from "./components/nav";
import productGridStyles from "./styles/pages/productGrid.module.css";
import ProductCard from "./components/productCard";

export default function App() {
	return (
		<>
			<Nav />
			<div className={productGridStyles.grid}>
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</div>
		</>
	);
}
