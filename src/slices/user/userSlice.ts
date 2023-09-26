import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

interface UserState {
	id: number;
	email: string;
	password: string;
	first_name: string;
	last_name: string;
}

const initialState: UserState = {
	id: -1,
	email: "",
	password: "",
	first_name: "",
	last_name: ""
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (_state: UserState, action: PayloadAction<UserState>) => {
			return action.payload;
		}
	}
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state;

export default userSlice.reducer;
