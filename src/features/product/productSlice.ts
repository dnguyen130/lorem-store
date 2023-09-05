import { createSlice } from "@reduxjs/toolkit";

export interface ProductState {
	id: number;
	name: string;
	description: string;
	brand: string;
	image: string;
	SKU: number;
	category: string;
	size: string;
	price: number;
	discount_id: number;
	created_at: Date;
	modified_at: Date;
}

const initialState: ProductState[] = [];

export const ProductSlice = createSlice({
	name: "product",
	initialState,
	reducers: {}
});
