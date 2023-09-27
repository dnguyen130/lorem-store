import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/utils/variables";

interface UserType {
	id: number;
	email: string;
	password: string;
	first_name: string;
	last_name: string;
}

const initialState: UserType = {
	id: -1,
	email: "",
	password: "",
	first_name: "",
	last_name: ""
};

export const userSlice = createSlice({
	name: "activeUser",
	initialState,
	reducers: {
		setActiveUser: (_state: UserType, action: PayloadAction<UserType>) => {
			return action.payload;
		}
	}
});

export const userApi = createApi({
	reducerPath: "user",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL
	}),
	endpoints: (builder) => ({
		signup: builder.mutation({
			query: (payload) => ({
				url: "signup",
				method: "POST",
				body: payload,
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			})
		})
	})
});

export const { useSignupMutation } = userApi;

export const { setActiveUser } = userSlice.actions;

export const selectUser = (state: RootState) => state;

export default userSlice.reducer;
