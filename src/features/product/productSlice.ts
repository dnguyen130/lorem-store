import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductState } from "@/types/product";

interface QueryType {
	data: ProductState[];
	meta: number;
}

export const productApi = createApi({
	reducerPath: "product",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://lorem-store-api-production.up.railway.app/"
	}),
	endpoints: (builder) => ({
		getAllProducts: builder.query<QueryType, string>({
			query: () => `product`
		})
	})
});

export const { useGetAllProductsQuery } = productApi;
