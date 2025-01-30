import { useUsers } from "./users-hooks";
import {  useAppSelector } from "../store";
import { Pagination } from "../Pagination/Pagination";
import { usePagination } from "../Pagination/usePagination";
import { UserCard } from "./UserCard";
import { useEffect } from "react";
import { IUsersLL } from "../store/userslice";
import { UserItem } from "./UserItem";

function Users() {
  const {onSort} = useUsers();
  const [listSlice, pagesList,onSetActive, activePage ] = usePagination<IUsersLL>({list: useAppSelector((state) => state.users.users), countPerPage:50})

  console.log('render user')
  useEffect(()=>{ console.log('render listSlice')},[listSlice])
  return (
    <>
      <Pagination pagesList={pagesList} onSetActive={onSetActive} activePage={activePage}></Pagination>
      
     <UserCard /> 

      <table>
        <thead>
          <tr key="h">
            <th>#</th>
            <th>id <span onClick={() => onSort("id")}>sort</span></th>
            <th>
              name <span onClick={() => onSort("name")}>sort</span>
            </th>
            <th>
              username <span onClick={() => onSort("username")}>sort</span>
            </th>
            <th>phone</th>
            <th>
              email <span onClick={() => onSort("email")}>sort</span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {listSlice?.map((inUser, i) => (
                inUser ?
                    <UserItem user={inUser} i={i} />
                :
                    <></>
                ))}
            
        </tbody>
      </table>
    </>
  );
}

export default Users;
