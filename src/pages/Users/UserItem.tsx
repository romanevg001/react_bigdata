import { memo } from "react";
import { IUser } from "./user.model";

export interface IUserItemProps {
    user: IUser;
   
}

export const UserItem = memo(({user}: IUserItemProps) =>{
    return (
        <tr>
            <td>{user.ind}</td>
            <td>{user.name}</td>
            <td>{user.department}</td>
            <td>{user.position}</td>
            <td>{user.email}</td>
            <td>
                {user.age}
            </td>
           
           
        </tr>
    );
});
