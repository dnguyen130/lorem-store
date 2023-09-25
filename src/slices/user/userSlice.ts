import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

interface UserState {
	isCreateProductModal: boolean;
}

const initialState: UserState = {
	isCreateProductModal: false
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state: UserState, action: PayloadAction<UserState>) => {
			state = action.payload;
		}
	}
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
