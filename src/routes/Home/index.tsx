// Packages
import { ReactElement, useState, useEffect } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

// Styles
import styles from "@/styles/routes/home.module.css";

// Types
import { ProductState } from "@/types/product";

//Redux
import { useGetProductsByPageQuery } from "@/features/product/productSlice";

//Components
import ProductCard from "@/components/productCard";

export default function Home(): ReactElement {
	const [products, setProducts] = useState<ProductState[] | never[]>([]);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { data, isLoading, isFetching } = useGetProductsByPageQuery(
		String(currentPage)
	);

	useEffect(() => {
		if (data && data.data !== products) {
			const totalProducts = Number(data?.total[0]["COUNT(*)"]);
			setProducts(data.data);
			setTotalPages(Math.ceil(totalProducts / data.listsPerPage));
		}
	}, [data, products]);

	if (isLoading) {
		return <div>Loading</div>;
	}

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
							onClick={() => console.log("yo")}
						/>
					);
				})}
			</div>
			<div className={styles.pagination}>
				<button
					onClick={() => setCurrentPage(currentPage - 1)}
					className={styles.prev}
					disabled={currentPage === 1}
				>
					{isFetching ? (
						<div className={styles.loader} />
					) : (
						<GrFormPrevious size="100%" />
					)}
				</button>
				<div>
					{currentPage} / {totalPages}
				</div>
				<button
					onClick={() => setCurrentPage(currentPage + 1)}
					className={styles.next}
					disabled={currentPage === totalPages}
				>
					{isFetching ? (
						<div className={styles.loader} />
					) : (
						<GrFormNext size="100%" />
					)}
				</button>
			</div>
		</div>
	);
}
