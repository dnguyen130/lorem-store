// Packages
import { ReactElement, useState, useEffect } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

// Styles
import styles from "@/styles/routes/home.module.css";

// Types
import { ProductType } from "@/types/product";

//Redux
import { useGetProductsByPageQuery } from "@/slices/product/productSlice";
import { useAppDispatch } from "@/app/hooks";
import {
	setActiveProduct,
	clearActiveProduct
} from "@/slices/product/productSlice";

//Components
import ProductCard from "@/components/productCard";

export default function Home(): ReactElement {
	const [products, setProducts] = useState<ProductType[] | never[]>([]);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { data, isLoading, isFetching } = useGetProductsByPageQuery(
		String(currentPage)
	);
	const dispatch = useAppDispatch();

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
				{products.map((o: ProductType) => {
					return (
						<ProductCard
							key={o.id}
							name={o.name}
							price={o.price}
							image={o.image}
							size={o.size}
							brand={o.brand}
							id={o.id}
							onMouseOver={() => dispatch(setActiveProduct(o))}
							onMouseLeave={() => clearActiveProduct()}
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
					Page <span>{currentPage}</span> / {totalPages}
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
