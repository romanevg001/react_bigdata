import { useAppSelector } from "../store";
import { UserCard } from "./UserCard";
import { UserSortedType, usersSlice, IUser } from "../store/userslice";
import { UserItem } from "./UserItem";
import { useState } from "react";
import { useLoadUsers, useUsers } from "./users-hooks";
import { usePagination } from "../Pagination/usePagination";

function Users() {
  // slow
  // const {onSort} = useUsers();
  //const [listSlice, pagesList,onSetActive, activePage ] = usePagination<IUser[]>({list: useAppSelector((state) => state.users.users), countPerPage:50})

  // fast
  const [sortType, onSort] = useState<UserSortedType>({type:'asc', field:'name'});
   const sortedUsers = useAppSelector((state) =>
    usersSlice.selectors.selectSortedUsers(state, sortType)
  ); 
  useLoadUsers()

  return (
    <>
  {/*     <Pagination
        pagesList={pagesList}
        onSetActive={onSetActive}
        activePage={activePage}
      ></Pagination>
 */}
      <UserCard />

      <table>
        <thead>
          <tr key="h">
            <th>#</th>
            <th>
              id <span onClick={() => onSort({type:'asc', field:'id'})}>asc</span> <span onClick={() => onSort({type:'desc', field:'id'})}>desc</span>
            </th>
            <th>
              name <span onClick={() => onSort({type:'asc', field:'name'})}>asc</span> <span onClick={() => onSort({type:'desc', field:'name'})}>desc</span>
            </th>
            <th>
              username <span onClick={() => onSort({type:'asc', field:'username'})}>asc</span> <span onClick={() => onSort({type:'desc', field:'username'})}>desc</span>
            </th>
            <th>phone</th>
            <th>
              email <span onClick={() => onSort({type:'asc', field:'email'})}>asc</span> <span onClick={() => onSort({type:'desc', field:'email'})}>desc</span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers?.map(
            (inUser, i) =>
              inUser && <UserItem key={inUser.id} user={inUser} i={i} />
          )}
        </tbody>
      </table>
    </>
  );
}

export default Users;
