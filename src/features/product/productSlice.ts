import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductState } from "@/types/product";
import { BASE_URL } from "@/utils/variables";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface QueryType {
	data: ProductState[];
	meta: number;
}

const initialState: ProductState = {
	name: "",
	description: "",
	brand: "",
	image: "",
	SKU: 0,
	category: "",
	size: "",
	price: 0
};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setProduct: (state, action: PayloadAction<ProductState>) => {
			state = action.payload;
		}
	}
});

export const productApi = createApi({
	reducerPath: "product",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL
	}),
	endpoints: (builder) => ({
		getAllProducts: builder.query<QueryType, string>({
			query: () => `product`
		})
	})
});

export const { setProduct } = productSlice.actions;

export const { useGetAllProductsQuery } = productApi;
