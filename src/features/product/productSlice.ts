import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductState } from "@/types/product";
import { BASE_URL } from "@/utils/variables";

interface QueryType {
	data: ProductState[];
	meta: number;
}

export const productApi = createApi({
	reducerPath: "product",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL
	}),
	endpoints: (builder) => ({
		getAllProducts: builder.query<QueryType, string>({
			query: () => `product`
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

export const { useGetAllProductsQuery, useAddNewProductMutation } = productApi;
