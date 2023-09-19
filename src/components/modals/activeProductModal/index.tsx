// Packages
import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Styles
import styles from "@/styles/components/createModal.module.css";

// Redux
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { setIsProductModal } from "@/features/modal/modalSlice";

interface CreateModalType {
	onClick: () => void;
}

export default function ActiveProductModal({
	onClick
}: CreateModalType): ReactElement {
	const dispatch = useAppDispatch();
	const isProductModal = useAppSelector((state) => state.modal.isProductModal);

	return (
		<AnimatePresence>
			{isProductModal && (
				<motion.div
					className={styles.container}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<h2>Confirm Product Creation</h2>
					<button onClick={onClick}>Submit</button>
					<button
						type="button"
						onClick={() => dispatch(setIsProductModal(false))}
					>
						Cancel
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
