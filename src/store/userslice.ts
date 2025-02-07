import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DoublyLinkedList } from "data-structure-typed";

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}
export type UserId = number;

export interface IUser {
  id: UserId;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  friends: UserId[];
  isFriend: (id: UserId) => boolean;
}
/*==========================================*/
export interface IUsersLL {
  linkedList: DoublyLinkedList<IUser>;
}
class UsersLL implements IUsersLL {
  linkedList!: DoublyLinkedList<IUser>;

  constructor(linkedList?: DoublyLinkedList<IUser>) {
    this.linkedList = linkedList ? linkedList : new DoublyLinkedList<IUser>();
  }
}

/*==========================================*/
/* type RecordUsersState = {
    entities: Record<UserId, IUser>,
    ids: UserId[],
    selectedUserId: UserId | undefined
};
 */
/*==========================================*/

export interface IUsersState {
  usersll: IUsersLL;
  users: IUser[];
  user: IUser | undefined;
  entities: Record<UserId, IUser>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
  //recordusers: RecordUsersState;
}

const initialState: IUsersState = {
  usersll: new UsersLL(),
  users: [],
  user: undefined,

  entities: {},
  ids: [],
  selectedUserId: undefined,
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
    selectorSortUsersll: createSelector(
      (state: IUsersState) => state.usersll.linkedList,
      (_: IUsersState, sort) => sort,
      (usersll, { type, field }) => {
        if (!usersll.length) return new DoublyLinkedList<IUser>();

        const st = performance.now();
        const x = usersll
          .sort((a, b) => {
            if (type === "asc") {
              return a[field] > b[field] ? 1 : -1;
            } else {
              return b[field] > a[field] ? 1 : -1;
            }
          })
          .slice(0, 50);
        console.log(
          "usersll: ",
          field,
          ":",
          type,
          " - ",
          performance.now() - st
        );
        return x;
      }
    ),
    selectSelectedUserId: (state) => state.selectedUserId,
    selectSortedEntities: createSelector(
      (state: IUsersState) => state.ids,
      (state: IUsersState) => state.entities,
      (_: IUsersState, sort) => sort,
      (ids, entities, { type, field }) => {
        if (!ids.length) return [];

        const st = performance.now();
        const x = ids
          .map((id) => entities[id])
          .sort((a, b) => {
            if (type === "asc") {
              return a[field] > b[field] ? 1 : -1;
            } else {
              return b[field] > a[field] ? 1 : -1;
            }
          })
          .slice(0, 50);
        console.log(
          "entities: ",
          field,
          ":",
          type,
          " - ",
          performance.now() - st
        );
        return x;
      }
    ),
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
          })
          .slice(0, 50);
        console.log("users: ", field, ":", type, " - ", performance.now() - st);
        return x;
      }
    ),
  },
  reducers: {
    setUsersll: (state, action: PayloadAction<DoublyLinkedList<IUser>>) => {
      state.usersll = new UsersLL(action.payload);
    },
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    sortUsersll: (
      state,
      { payload: { field, type } }: PayloadAction<UserSortedType>
    ) => {
      const st = performance.now();
      state.usersll = new UsersLL(
        state.usersll.linkedList.sort((a, b) => {
          return type == "asc"
            ? a[field] > b[field]
              ? 1
              : -1
            : b[field] > a[field]
            ? 1
            : -1;
        })
      );
      console.log(performance.now() - st);
    },
    sortUsers: (
      state,
      { payload: { field, type } }: PayloadAction<UserSortedType>
    ) => {
      //slow
      const st = performance.now();
      state.users = state.ids
        .map((id) => state.entities[id])
        .sort((a, b) => {
          if (type === "asc") {
            return a[field] > b[field] ? 1 : -1;
          } else {
            return b[field] > a[field] ? 1 : -1;
          }
        })
        .slice(0, 50);
      console.log(performance.now() - st);
    },

    getUserll: (state, action: PayloadAction<number>) => {
      const st = performance.now();
      state.user = state.usersll.linkedList.find(
        (user) => user.id == action.payload
      );
      console.log(performance.now() - st);
    },

    getUser: (state, action: PayloadAction<number>) => {
      const st = performance.now();
      state.user = state.users.find((user) => user.id == action.payload);
      console.log(performance.now() - st);
    },
    setEntities: (state, action: PayloadAction<{ users: IUser[] }>) => {
      const { users } = action.payload;

      state.entities = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<UserId, IUser>);
      state.ids = users.map((user) => user.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUsers,
  setUsersll,
  getUser,
  sortUsersll,
  getUserll,
  setEntities,
  sortUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
