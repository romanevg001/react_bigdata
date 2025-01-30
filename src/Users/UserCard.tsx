import { memo } from "react";
import { IUser } from "../store/userslice";
import { useAppSelector } from "../store";

export const UserCard = memo(() =>{
  const user = useAppSelector((state) => state.users.user);

  console.log('render user card', user)
  
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
