import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
	selectIsProductModal,
	selectIsCreateProductModal,
	setIsCreateProductModal,
	setIsProductModal
} from "@/features/modal/modalSlice";
import { clearActiveProduct } from "@/features/product/productSlice";

export default function Overlay(): ReactElement {
	const dispatch = useAppDispatch();
	const isCreateProductModal = useAppSelector(selectIsCreateProductModal);
	const isProductModal = useAppSelector(selectIsProductModal);

	return (
		<AnimatePresence>
			{(isCreateProductModal || isProductModal) && (
				<motion.div
					className="overlay"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={(e) => {
						e.stopPropagation;
						dispatch(setIsCreateProductModal(false));
						dispatch(setIsProductModal(false));
						clearActiveProduct();
					}}
				/>
			)}
		</AnimatePresence>
	);
}
