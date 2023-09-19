import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

interface ModalState {
	isCreateProductModal: boolean;
	isProductModal: boolean;
}

const initialState: ModalState = {
	isCreateProductModal: false,
	isProductModal: false
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setIsCreateProductModal: (
			state: ModalState,
			action: PayloadAction<boolean>
		) => {
			state.isCreateProductModal = action.payload;
		},
		setIsProductModal: (state: ModalState, action: PayloadAction<boolean>) => {
			state.isProductModal = action.payload;
		}
	}
});

export const { setIsCreateProductModal, setIsProductModal } =
	modalSlice.actions;

export const selectIsCreateProductModal = (state: RootState) =>
	state.modal.isCreateProductModal;

export const selectIsProductModal = (state: RootState) =>
	state.modal.isProductModal;

export default modalSlice.reducer;
