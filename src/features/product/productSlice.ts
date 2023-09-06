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
		})
	})
});

export const { useGetAllProductsQuery } = productApi;
