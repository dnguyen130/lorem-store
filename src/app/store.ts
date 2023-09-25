import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productApi } from "../slices/product/productSlice";
import modalReducer from "@/slices/modal/modalSlice";
import activeProductReducer from "@/slices/product/productSlice";
import userReducer from "@/slices/user/userSlice";

export const store = configureStore({
	reducer: {
		[productApi.reducerPath]: productApi.reducer,
		activeProduct: activeProductReducer,
		modal: modalReducer,
		user: userReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productApi.middleware)
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
