import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DoublyLinkedList } from 'data-structure-typed';

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
type UserId = number;

export interface IUser {
  id: UserId;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface IUsersState {
  users: IUser[];
  user: IUser | undefined;
  recordusers: RecordUsersState;
}

const initialState: IUsersState = {
  users: [],
  user: undefined
};
/*==========================================*/
interface IUsersLL {
    linkedList: DoublyLinkedList<IUser>
}
class UsersLL implements IUsersLL {
    linkedList!: DoublyLinkedList<IUser>;

    constructor(linkedList?: DoublyLinkedList<IUser>){
        this.linkedList = linkedList ? linkedList : new DoublyLinkedList<IUser>();
    }
}
export interface IUsersStateLL {
    users: IUsersLL;
    user: IUser | undefined;
    
}
const initialStateLL: IUsersStateLL = {
    users: new UsersLL(),
    user: undefined,
};
/*==========================================*/
type RecordUsersState = {
    entities: Record<UserId, IUser>,
    ids: UserId[],
    selectedUserId: UserId | undefined
};
const initialStateRecord: RecordUsersState = {
    entities: {},
    ids: [],
    selectedUserId:  undefined
}
/*==========================================*/

const randomWord = () =>{
    
    const alfl = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 
    const wordLength = Math.round(5 + Math.random() * (20 + 1 - 5));
    let word = [];
    for(let i=0; i< wordLength; i++) {
        word.push(alfl[Math.round(Math.random()*26)]);
    }
    return word.join('');
}
const userGenerator = (arr: IUser[]) => {
    for(let i=arr.length+1; i< 100000; i++) {
        arr.push({
            id: i,
            name: randomWord(),
            username: randomWord(),
            email: randomWord(),
            phone: randomWord(),
            website: randomWord(),
        })
    }
    return arr;
}

const userGeneratorLL = (arr: IUser[]) => {
    const dll = new DoublyLinkedList<IUser>();
    arr.forEach(el=>{
        dll.push(el);
    })
    for(let i=arr.length+1; i< 100000; i++) {
        dll.push({
            id: i,
            name: randomWord(),
            username: randomWord(),
            email: randomWord(),
            phone: randomWord(),
            website: randomWord(),
        })
    }
    return dll;
}


export type UserSortedType = Omit<keyof IUser, "address" | "company">;


export const usersSlice = createSlice({
  name: "users",
  initialState: initialStateLL,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = new UsersLL(userGeneratorLL([]));
      //state.users.linkedList.slice(0,50).map(el=>console.log(el))
      
      //state.users = userGenerator(action.payload);
    },
    sortUsers: (state, action: PayloadAction<UserSortedType>) => {
        const st = performance.now();
        state.users = new UsersLL(state.users.linkedList.sort((a, b) => {
            let aa = a[action.payload];
            let bb = b[action.payload];
            aa = typeof aa == 'string' ? aa.toLowerCase() : aa;
            bb = typeof bb == 'string' ? bb.toLowerCase() : bb;
            return aa > bb ? 1 : -1;
        })); 
        /* state.users = state.users.sort((a, b) => {
            return a[action.payload].toLowerCase() > b[action.payload].toLowerCase() ? 1 : -1;
        }); */
        console.log( performance.now() - st);
    },
    getUser: (state, action: PayloadAction<number>) => {
     
         state.user = state.users.linkedList.find(user => user.id == action.payload)
         //state.user = state.users.find(user => user.id == action.payload)
      
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, sortUsers, getUser } = usersSlice.actions;

export default usersSlice.reducer;
