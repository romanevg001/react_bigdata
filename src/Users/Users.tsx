import { useUsers } from "./useLoadUsers";
import { useAppSelector } from "../store";
import { Pagination } from "../Pagination/Pagination";
import { usePagination } from "../Pagination/usePagination";

function Users() {
  const users = useAppSelector((state) => state.users.users);
  const user = useAppSelector((state) => state.users.user);
  const [onSort, getUserById] = useUsers();
  const [listSlice, pagesList,onSetActive, activePage ] = usePagination<typeof users.linkedList>({list: users, countPerPage:50})

  return (
    <>
      <Pagination pagesList={pagesList} onSetActive={onSetActive} activePage={activePage}></Pagination>
      
      <div className="card">
        <p>
          #{user?.id} {user?.name} <i>({user?.username})</i>
        </p>
        <p>
          phone: {user?.phone}, email: {user?.email}
        </p>
      </div>
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
