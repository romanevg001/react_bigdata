import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./user.model";

export interface IUsersState {
  users: IUser[];
  usersFilter: {};
  activeUser: IUser | undefined;
}

const initialState: IUsersState = {
  users: [],
  usersFilter:{},
  activeUser: undefined
};

/*==========================================*/

export type UserSortedType = {
  field: Omit<keyof IUser, "address" | "company">;
  type: "asc" | "desc";
};


export const usersSlice = createSlice({
  name: "users",
  initialState,
  selectors: {
    //selectSelectedUserId: (state) => state.selectedUserId,
    
    selectorUsers: createSelector(
      (state: IUsersState) => state.users,
      (_: IUsersState, sort) => sort,
      (users, { type, field }) => {
        if (!users.length) return [];

        const st = performance.now();
        const x = users
          .toSorted((a, b) => {
            if (type === "asc") {
              return a[field] > b[field] ? 1 : -1;
            } else {
              return b[field] > a[field] ? 1 : -1;
            }
          });
        console.log("users: ", field, ":", type, " - ", performance.now() - st);
        return x;
      }
    ),
  },
  reducers: {
    
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      console.log(action.payload)
      state.users = action.payload;
    },


    getUser: (state, action: PayloadAction<number>) => {
      const st = performance.now();
      state.activeUser = state.users.find((user) => user.id == action.payload);
      console.log(performance.now() - st);
    },
   
  },
});

// Action creators are generated for each case reducer function
export const usersActions = usersSlice.actions;

export default usersSlice.reducer;

