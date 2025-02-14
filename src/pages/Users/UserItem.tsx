import { memo } from "react";
import { IUser } from "./user.model";
import { TableUsersColumnsEnum, tableUsersColumnsEditRules } from "./table-fields.model";

export interface IUserItemProps {
    user: IUser;
   
}

export const UserItem = memo(({user}: IUserItemProps) =>{
    
    const startEdit = (el) =>{

    }
    return (
        <tr>
            {
                Object.keys(TableUsersColumnsEnum).map((el)=>
                    <td key={el}>
                    { !!tableUsersColumnsEditRules[el] ?
                        <span className="flex items-center hover:text-indigo-600 cursor-pointer" onClick={()=>startEdit(el)}>
                            <span className="grow-1">{user[el]}</span>
                            <span className="icon-pencil2"></span>
                        </span>
                        :
                        <>{user[el]}</>
                    }

                    </td>
                )
            }
        </tr>
    );
});
