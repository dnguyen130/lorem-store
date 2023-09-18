import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

interface ModalState {
	isCreateProductModal: boolean;
}

const initialState: ModalState = {
	isCreateProductModal: false
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setIsCreateProductModal: (state, action: PayloadAction<boolean>) => {
			state.isCreateProductModal = action.payload;
		}
	}
});

export const { setIsCreateProductModal } = modalSlice.actions;

export const selectIsCreateProductModal = (state: RootState) =>
	state.modal.isCreateProductModal;

export default modalSlice.reducer;
