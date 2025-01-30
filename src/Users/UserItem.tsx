import { memo } from "react";
import { IUser } from "../store/userslice";
import { useUsers } from "./users-hooks";


export const UserItem = memo(({user, i}: {user: IUser, i: number}) =>{
  const {getUserById} = useUsers();

  console.log('render UserItem')
  

    return (
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
    );
});
