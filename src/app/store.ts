import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productApi } from "../features/product/productSlice";
import modalReducer from "@/features/modal/modalSlice";
import activeProductReducer from "@/features/product/productSlice";

export const store = configureStore({
	reducer: {
		[productApi.reducerPath]: productApi.reducer,
		activeProduct: activeProductReducer,
		modal: modalReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productApi.middleware)
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
