import { memo } from "react";
import { IUser, UserId } from "../store/userslice";

export interface IUserItemProps {
    user: IUser;
    i: number;
    getUserById: (f:UserId)=>void; 
    friends?:IUser;
    setFriends?: (f:IUser)=>void; 
}

export const UserItem = memo(({user, i, getUserById, friends, setFriends }: IUserItemProps) =>{
    return (
        <tr>
            <td>{++i}</td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>
                <button onClick={() => getUserById(user.id)}>getUserById </button>
            </td>
           
            {(setFriends) &&      
                (<td>
                    [{user.friends.map(fr=>(<span key={fr}>{fr}, </span>))}] <br />
                    {friends?.id >= 0 && (friends?.id !== user.id) && (user.isFriend(friends.id) ? 'yes' : 'no') }<br />
                    <button onClick={() => setFriends(user)}>whoes friend</button>
                </td>
            )}

        </tr>
    );
});
