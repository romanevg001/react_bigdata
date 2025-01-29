import { memo } from "react";
import { IUser } from "../store/userslice";

export const UserCard = memo(({user}: {user: IUser}) =>{

  console.log('render user card')
  
  return (<div className="card">
        <p>
          #{user?.id} {user?.name} <i>({user?.username})</i>
        </p>
        <p>
          phone: {user?.phone}, email: {user?.email}
        </p>
      </div>
  );
});
