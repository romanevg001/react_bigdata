import { useEffect } from "react";
import {
  setUsers,
  sortUsers,
  UserSortedType,
  getUser,
} from "../store/userslice";
import { useAppDispatch } from "../store";

export function useLoadUsers() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    /* fetch("https://jsonplaceholder.typicode.com/users/", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setUsers(data));
      }); */
      dispatch(setUsers({}));
  }, []);
}

export function useUsers() {
  const dispatch = useAppDispatch();

  const onSort = (data: UserSortedType) => {
    dispatch(sortUsers(data));
  };

  const getUserById = (data: number) => {
    dispatch(getUser(data));
  };

  return {onSort, getUserById};
}
