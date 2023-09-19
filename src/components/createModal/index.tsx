// Packages
import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Styles
import styles from "@/styles/components/createModal.module.css";

// Redux
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { setIsCreateProductModal } from "@/features/modal/modalSlice";
import {
	clearActiveProduct,
	selectActiveProduct
} from "@/features/product/productSlice";

interface CreateModalType {
	onClick: () => void;
}

export default function CreateModal({
	onClick
}: CreateModalType): ReactElement {
	const dispatch = useAppDispatch();
	const isCreateProductModal = useAppSelector(
		(state) => state.modal.isCreateProductModal
	);
	const activeProduct = useAppSelector(selectActiveProduct);

	return (
		<AnimatePresence>
			{isCreateProductModal && (
				<motion.div
					className={styles.container}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<h2>Confirm Product Creation</h2>
					<div className={styles.content}>
						<h3>
							Title: {activeProduct.name ? activeProduct.name : "No Title"}
						</h3>
						<p>
							Description:{" "}
							{activeProduct.description
								? activeProduct.description
								: "No description"}
						</p>
						<div className={styles.row}>
							<p>
								Brand: {activeProduct.brand ? activeProduct.brand : "No brand"}
							</p>
							<p>
								Category:{" "}
								{activeProduct.category
									? activeProduct.category
									: "No category"}
							</p>
						</div>
						<div className={styles.row}>
							<p>
								Price:{" "}
								{activeProduct.price ? "$" + activeProduct.price : "No price"}
							</p>
							<p>Size: {activeProduct.size ? activeProduct.size : "No size"}</p>
						</div>
					</div>
					<div className={styles.button_row}>
						<button onClick={onClick}>Submit</button>
						<button
							type="button"
							onClick={() => {
								dispatch(setIsCreateProductModal(false)), clearActiveProduct();
							}}
						>
							Cancel
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
