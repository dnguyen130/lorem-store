import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
	selectIsCreateProductModal,
	setIsCreateProductModal
} from "@/features/modal/modalSlice";
import { clearActiveProduct } from "@/features/product/productSlice";

export default function Overlay(): ReactElement {
	const dispatch = useAppDispatch();
	const isCreateProductModal = useAppSelector(selectIsCreateProductModal);

	return (
		<AnimatePresence>
			{isCreateProductModal && (
				<motion.div
					className="overlay"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={(e) => {
						e.stopPropagation;
						dispatch(setIsCreateProductModal(false));
						clearActiveProduct();
					}}
				/>
			)}
		</AnimatePresence>
	);
}
