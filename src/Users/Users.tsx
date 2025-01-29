import { useUsers } from "./users-hooks";
import { useAppSelector } from "../store";
import { Pagination } from "../Pagination/Pagination";
import { usePagination } from "../Pagination/usePagination";
import { UserCard } from "./UserCard";
import { useEffect } from "react";

function Users() {
  const user = useAppSelector((state) => state.users.user);
  const [onSort, getUserById] = useUsers();
  const [listSlice, pagesList,onSetActive, activePage ] = usePagination<typeof users.linkedList>({list: useAppSelector((state) => state.users.users), countPerPage:50})

  console.log('render user')
  useEffect(()=>{ console.log('render listSlice')},[listSlice])
  return (
    <>
      <Pagination pagesList={pagesList} onSetActive={onSetActive} activePage={activePage}></Pagination>
      
     { user && <UserCard user={user} /> } 

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
            {listSlice?.map((user, i) => (
                user ?
                    <tr key={user.id}>
                        <td>{++i}</td>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => getUserById(user.id)}>
                            getUserById
                            </button>
                        </td>
                    </tr>
                :
                    <></>
                ))}
            
        </tbody>
      </table>
    </>
  );
}

export default Users;
