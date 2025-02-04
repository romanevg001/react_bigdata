import { useEffect } from "react";
import {
  setUsers,
  setUsersll,
  UserSortedType,
  getUser,
  sortUsersll,
  getUserll,
  setEntities,
  sortUsers
} from "../store/userslice";
import { useAppDispatch } from "../store";
import { userGenerator, userGeneratorLL } from "../dataGenerator";

export function useLoadUsersll() {
  const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(setUsersll(userGeneratorLL()));
  }, []);
}

export function useUsersll() {
  const dispatch = useAppDispatch();

  const onSort = (data: UserSortedType) => {
    dispatch(sortUsersll(data));
  };

  const getUserById = (data: number) => {
    dispatch(getUserll(data));
  };

  return {onSort, getUserById};
}

/*===========================================================*/

export function useLoadEntities() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setEntities({ users: userGenerator()}));
  }, []);
}
/**============================================================== */

export function useLoadUsers() {
  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(setUsers(userGenerator()));
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

  return {getUserById, onSort};
}