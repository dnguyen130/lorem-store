import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductState } from "@/types/product";
import { BASE_URL } from "@/utils/variables";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

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
	name: "activeproduct",
	initialState,
	reducers: {
		setActiveProduct: (
			_state: ProductState,
			payload: PayloadAction<ProductState>
		) => {
			return payload.payload;
		},
		clearActiveProduct: () => initialState
	}
});

export const productApi = createApi({
	reducerPath: "product",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL
	}),
	endpoints: (builder) => ({
		getProductsByPage: builder.query<QueryType, string>({
			query: (page) => `product/?page=${page}`
		}),
		addNewProduct: builder.mutation({
			query: (payload) => ({
				url: "product",
				method: "POST",
				body: payload,
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			})
		})
	})
});

export const { useGetProductsByPageQuery, useAddNewProductMutation } =
	productApi;

export const { setActiveProduct, clearActiveProduct } = productSlice.actions;

export const selectActiveProduct = (state: RootState) => state.activeProduct;
export default productSlice.reducer;
