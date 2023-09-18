// Packages
import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Styles
import styles from "@/styles/components/createModal.module.css";

// Redux
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { setIsCreateProductModal } from "@/features/modal/modalSlice";

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

	return (
		<AnimatePresence>
			{isCreateProductModal && (
				<motion.div
					className="overlay"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div className={styles.container}>
						<h2>Confirm Product Creation</h2>
						<button onClick={onClick}>Submit</button>
						<button
							type="button"
							onClick={() => dispatch(setIsCreateProductModal(false))}
						>
							Cancel
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
